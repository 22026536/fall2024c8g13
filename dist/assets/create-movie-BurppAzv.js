import{r as p,j as e,T as f,K as l,B as m,z as u,M as b,A as y}from"./TextField-DZyt019d.js";import{D as v,C,a as T,b as S,S as w,H as R}from"./admin-Bp2qA-3f.js";import{S as k}from"./Stack-CFKMML1m.js";function D(){const[i,s]=p.useState({film_name:"",film_img:null,film_trailer:"",Release_date:"",film_describe:"",age_limit:"",duration:"",film_type:"1",categories:"",directors:"",actors:""}),[d,c]=p.useState({open:!1,message:"",severity:"success"}),g=[{value:"1",label:"Đang chiếu"},{value:"2",label:"Sắp chiếu"}],h=()=>c(t=>({...t,open:!1})),r=t=>{const{name:a,value:n}=t.target;s(o=>({...o,[a]:n}))},x=()=>{s(t=>({...t,film_img:null}))},_=t=>{const a=t.target.files[0];if(a){const n=new FileReader;n.onload=()=>{s(o=>({...o,film_img:n.result}))},n.readAsDataURL(a)}},j=async t=>{t.preventDefault();const a=new FormData;a.append("film_name",i.film_name),a.append("film_trailer",i.film_trailer),a.append("Release_date",i.Release_date),a.append("film_describe",i.film_describe),a.append("age_limit",i.age_limit),a.append("duration",i.duration),a.append("film_type",i.film_type),i.film_img&&a.append("film_img",i.film_img);try{const n=localStorage.getItem("jwt");if(!n){console.error("JWT token is missing");return}if(!(await fetch("/api/admin/films/create",{method:"POST",headers:{Authorization:"Bearer "+n},body:JSON.stringify(payload)})).ok)throw new Error("Failed to create movie");c({open:!0,message:"Phim đã được tạo thành công!",severity:"success"}),setTimeout(()=>navigate("/admin/movie"),1e3)}catch{s({film_name:"",film_img:null,film_trailer:"",Release_date:"",film_describe:"",age_limit:"",duration:"",film_type:1,categories:"",directors:"",actors:""}),c({open:!0,message:"Có lỗi xảy ra khi tạo phim!",severity:"error"})}};return e.jsxs(v,{children:[e.jsxs(C,{children:[e.jsx(T,{title:e.jsx(f,{variant:"h2",children:"Mẫu tạo phim mới"})}),e.jsx(S,{children:e.jsxs("form",{onSubmit:j,children:[e.jsxs(k,{spacing:3,children:[e.jsx(l,{name:"film_name",label:"Tên phim",value:i.film_name,onChange:r,required:!0,fullWidth:!0}),e.jsxs(m,{display:"flex",flexDirection:"column",alignItems:"center",sx:{width:"300px"},children:[e.jsx(m,{sx:{width:"300px",height:"450px",backgroundColor:"#e0e0e0",border:"1px solid #ccc",borderRadius:"4px",display:"flex",justifyContent:"center",alignItems:"center",position:"relative",overflow:"hidden"},children:i.film_img?e.jsx("img",{src:i.film_img,alt:"Movie Poster",style:{width:"100%",height:"100%",objectFit:"contain",objectPosition:"center"}}):e.jsx(f,{variant:"caption",color:"textSecondary",sx:{textAlign:"center"},children:"Chưa có poster phim"})}),e.jsx(m,{sx:{marginTop:"10px"},children:i.film_img?e.jsx(u,{onClick:x,variant:"outlined",color:"error",size:"small",children:"Xóa poster phim"}):e.jsxs(e.Fragment,{children:[e.jsx("input",{accept:"image/*",id:"upload-poster",type:"file",style:{display:"none"},onChange:_}),e.jsx("label",{htmlFor:"upload-poster",children:e.jsx(u,{variant:"outlined",color:"info",size:"small",component:"span",children:"Thêm poster phim"})})]})})]}),e.jsx(l,{name:"film_trailer",label:"URL trailer",value:i.film_trailer,onChange:r,fullWidth:!0}),e.jsx(l,{name:"Release_date",label:"Ngày phát hành",type:"date",InputLabelProps:{shrink:!0},value:i.Release_date,onChange:r,required:!0,fullWidth:!0}),e.jsx(l,{name:"film_describe",label:"Mô tả",value:i.film_describe,onChange:r,multiline:!0,rows:4,required:!0,fullWidth:!0}),e.jsx(l,{name:"age_limit",label:"Giới hạn độ tuổi",type:"number",value:i.age_limit,onChange:r,required:!0,fullWidth:!0}),e.jsx(l,{name:"duration",label:"Thời lượng (phút)",type:"number",value:i.duration,onChange:r,required:!0,fullWidth:!0}),e.jsx(l,{name:"film_type",label:"Trạng thái phim",select:!0,value:i.film_type,onChange:r,required:!0,fullWidth:!0,children:g.map(t=>e.jsx(b,{value:t.value,children:t.label},t.value))}),e.jsx(l,{name:"categories",label:"Thể loại (cách nhau bởi dấu phẩy)",value:i.categories,onChange:r,fullWidth:!0}),e.jsx(l,{name:"directors",label:"Đạo diễn (cách nhau bởi dấu phẩy)",value:i.directors,onChange:r,fullWidth:!0}),e.jsx(l,{name:"actors",label:"Diễn viên (cách nhau bởi dấu phẩy)",value:i.actors,onChange:r,fullWidth:!0})]}),e.jsx(m,{mt:3,display:"flex",justifyContent:"flex-end",children:e.jsx(u,{type:"submit",variant:"contained",color:"primary",children:"Tạo phim"})})]})})]}),e.jsx(w,{open:d.open,autoHideDuration:4e3,onClose:h,children:e.jsx(y,{onClose:h,severity:d.severity,children:d.message})})]})}function I(){return e.jsxs(e.Fragment,{children:[e.jsx(R,{children:e.jsxs("title",{children:[" ","Tạo phim | Trang quản trị website bán vé xem phim NHTT"]})}),e.jsx(D,{})]})}export{I as default};