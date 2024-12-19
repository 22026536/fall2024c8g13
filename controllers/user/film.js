import dotenv from "dotenv";
import { isTokenExpired, verifyToken } from '../../middlewares/JWT.js';
import calculateTicketPrice from "../../middlewares/user/seatPrice.js";
import connection from "../../models/SQLConnection.js";
dotenv.config();

export const filmShowing = async (req, res) => {
    try {
        const results = await connection.promise().query('SELECT f.film_id , f.film_name , f.film_img , f.film_trailer , f.Release_date , f.film_describe,f.age_limit,f.duration,f.film_type,f.country,fe.film_rate FROM films f inner join film_evaluate fe on  fe .film_id = f.film_id WHERE film_type = 1 or film_type = 2');
        return res.json(results);

    } catch (error) {
        console.error('Lỗi:', error.message);
        res.status(500).json({ error: error.message }); // Xử lý lỗi
    }
};

export const filmInfo = async (req, res) => {
    var postInfo = {
        film: [],
        evaluate: [],
        actors: [],
        directors: [],
        categorys: []
    };

    try {
        // Truy vấn thông tin phim
        const queryFilm = `Select * from films where films.film_id = ?`;
        const filmResults = await new Promise((resolve, reject) => {
            connection.query(queryFilm, [req.params.id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        postInfo.film = filmResults;

        const queryEvaluate = `Select film_rate,sum_rate from film_evaluate where film_id = ?`;
        const evaluateResults = await new Promise((resolve, reject) => {
            connection.query(queryEvaluate, [req.params.id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        postInfo.evaluate = evaluateResults;

        // Truy vấn diễn viên
        const queryActor = `Select A.actor_id,A.actor_name
                            from actors as A
                            inner join actor_film as AF on A.actor_id = AF.actor_id
                            inner join films as F on AF.film_id = F.film_id
                            where F.film_id = ?`;
        const actorResults = await new Promise((resolve, reject) => {
            connection.query(queryActor, [req.params.id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        postInfo.actors = actorResults;
        // Truy vấn đạo diễn
        const queryDirector = `Select D.director_id,D.director_name
                               from directors as D
                               inner join director_film as DF on D.director_id = DF.director_id
                               inner join films as F on DF.film_id = F.film_id
                               where F.film_id = ?`;
        const directorResults = await new Promise((resolve, reject) => {
            connection.query(queryDirector, [req.params.id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        postInfo.directors = directorResults;

        // Truy vấn thể loại
        const queryCategory = `Select C.category_id,C.category_name
                               from categorys as C
                               inner join category_film as CF on C.category_id = CF.category_id
                               inner join films as F on CF.film_id = F.film_id
                               where F.film_id = ?`;
        const categoryResults = await new Promise((resolve, reject) => {
            connection.query(queryCategory, [req.params.id], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
        postInfo.categorys = categoryResults;
        // Trả về kết quả
        return res.json({
            success: true,
            info: postInfo
        });

    } catch (err) {
        return res.json({
            message: err.message,
            success: false
        });
    }
};

export const filmShowTimeInfo = async (req, res) => {
    const regionId = req.params.khuVuc_id;
    const filmId = req.params.id;

    // Lấy ngày hôm nay và 4 ngày tiếp theo
    const today = new Date();
    const days = Array.from({ length: 5 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i);
        return date;
    });

    // Định dạng ngày thành YYYY-MM-DD
    const formattedDays = days.map(day => day.toISOString().split('T')[0]);

    // Truy vấn MySQL để lấy dữ liệu lịch chiếu
    const query = `
        SELECT cluster_name, cinemas.cinema_id, cinema_name, address, show_date, show_time, showtime_id
        FROM cinemas
        INNER JOIN cinema_clusters ON cinemas.cluster_id = cinema_clusters.cluster_id
        INNER JOIN showtimes ON cinemas.cinema_id = showtimes.cinema_id
        WHERE region_id = ? AND film_id = ? AND show_date BETWEEN ? AND ?
    `;

    connection.query(query, [regionId, filmId, formattedDays[0], formattedDays[4]], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        // Xử lý kết quả
        const postOut = {};

        // Tạo cấu trúc dữ liệu mặc định với mảng rỗng cho từng ngày
        formattedDays.forEach(day => {
            const date = new Date(day);
            const weekday = date.toLocaleDateString('en', { weekday: 'long' });
            const formattedShowDate = `${weekday} ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            postOut[formattedShowDate] = [];
        });

        // Nhóm kết quả theo ngày
        results.forEach(row => {
            const { cluster_name, cinema_id, cinema_name, address, show_date, show_time, showtime_id } = row;
            const showDate = new Date(show_date);
            const formattedShowDate = `${showDate.toLocaleDateString('en', { weekday: 'long' })} ${showDate.getDate()}-${showDate.getMonth() + 1}-${showDate.getFullYear()}`;

            // Bỏ qua lịch chiếu ngày hôm nay nhưng giờ nhỏ hơn giờ hiện tại
            if (formattedDays[0] === show_date && new Date(`1970-01-01T${show_time}`) <= today) {
                return;
            }

            // Thêm thông tin lịch chiếu vào cấu trúc
            if (!postOut[formattedShowDate]) {
                postOut[formattedShowDate] = [];
            }

            const cluster = postOut[formattedShowDate].find(c => c.cluster_name === cluster_name);
            if (!cluster) {
                postOut[formattedShowDate].push({
                    cluster_name,
                    cinemas: []
                });
            }

            const cinema = cluster.cinemas.find(c => c.cinema_id === cinema_id);
            if (!cinema) {
                cluster.cinemas.push({
                    cinema_id,
                    cinema_name,
                    address,
                    show_times: []
                });
            }

            cinema.show_times.push({
                show_time,
                showtime_id,
                seatPrice: calculateTicketPrice('0', showDate.toLocaleDateString('en', { weekday: 'long' }), show_time)
            });
        });

        return res.json(postOut);
    });
};


export const getComment = async (req, res) => {
    const filmId = req.params.id;
    // Truy vấn MySQL
    const query = `
        select users.user_id, users.user_img, users.full_name, comments, star, date_posted from evaluate
        left join users on evaluate.user_id = users.user_id
        where film_id = ?
    `;
    connection.query(query, [filmId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        return res.json({
            numberOfComment: results.length,
            comment: results
        });
    });
}


export const postComment = async (req, res) => {
    const token = req.body.jwt;

    if (!token) {
        return res.json({
            message: "Người dùng chưa đăng nhập",
            success: false
        })
    }

    if (isTokenExpired(token)) {
        return res.json({
            message: "Người dùng hết phiên đăng nhập",
            success: false
        })
    }

    const decoded = verifyToken(token);
    const user_id = decoded.id


    const checkQuery = `
    SELECT * FROM evaluate WHERE user_id = ? AND film_id = ?`;

    connection.query(checkQuery, [user_id, req.body.film_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        if (results.length > 0) {
            // Người dùng đã đánh giá phim này
            return res.json({
                success: false,
                message: "Người dùng chỉ được đánh giá 1 lần"
            });
        }


        const query = `
       insert into evaluate value (?,?,?,?,Now())
    `;
        connection.query(query, [user_id, req.body.film_id, req.body.comments, req.body.star], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database query failed' });
            }

            return res.json({
                success: true,
                message: "Đánh giá thành công"
            });
        });
    });
}
export const phim = async (req, res) => {
    const { filmType, country, categoryId } = req.body;
    let query = `
    SELECT films.film_id, GROUP_CONCAT(category_film.category_id) AS categories, films.film_id, films.film_img, films.Release_date,MAX(film_evaluate.film_rate) AS film_rate, films.film_name
    FROM films
    INNER JOIN category_film ON category_film.film_id = films.film_id
    inner join film_evaluate on films.film_id = film_evaluate.film_id
    `;
    let params = [];

    // Chỉ thêm điều kiện nếu tham số có giá trị
    if (filmType && filmType !== '4') {
        query += " AND film_type = ?";
        params.push(filmType);
    }

    if (country && country !== '2') {
        query += " AND country = ?";
        params.push(country);
    }

    if (categoryId && categoryId !== '18') {
        query += " AND category_id = ?";
        params.push(categoryId);
    }
    query += " GROUP BY films.film_id";
    connection.query(query, params, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Database error', error });
        }
        return res.json(results);
    });
}


export const filmSearchByName = async (req, res) => {
    // Lấy từ khóa tìm kiếm từ query string
    const searchQuery = req.params.q;

    if (!searchQuery) {
        return res.status(400).json({ error: 'Vui lòng nhập từ khóa tìm kiếm.' });
    }
    const query = `
    SELECT f.film_id , f.film_name , f.film_img , f.film_trailer , f.Release_date , f.film_describe,f.age_limit,f.duration,f.film_type,f.country,fe.film_rate 
    FROM films f 
    inner join film_evaluate fe on  fe .film_id = f.film_id 
    WHERE f.film_name like ?
  `;

    // Thực hiện truy vấn
    connection.query(query, [`%${searchQuery}%`], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi truy vấn cơ sở dữ liệu.' });
        }

        // Phân loại kết quả theo film_type
        const filmsByType = results.reduce((acc, film) => {
            if (!acc[film.film_type]) {
                acc[film.film_type] = [];
            }
            acc[film.film_type].push(film);
            return acc;
        }, {});

        // Trả về kết quả
        return res.json(filmsByType);
    });
}


export const filmType = async (req, res) => {
    const { category_id } = req.params;

    // Validate category_id
    if (!category_id) {
        return res.status(400).json({ message: 'category_id is required' });
    }

    let query = `
    SELECT 
        films.film_id,
        films.film_name,
        films.film_img,
        films.Release_date,
        film_evaluate.film_rate,
        category_film.category_id
    FROM films
    INNER JOIN category_film ON category_film.film_id = films.film_id
    INNER JOIN film_evaluate ON film_evaluate.film_id = films.film_id
    WHERE category_film.category_id = ?
    `;

    connection.query(query, [category_id], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Database error', error });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No films found for this category' });
        }
        return res.json(results);
    });
};



