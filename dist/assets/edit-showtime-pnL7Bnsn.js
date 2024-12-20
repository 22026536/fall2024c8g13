import{r as o,y as W,l as e,T as E,B as C,W as c,J as q,A,a4 as H}from"./TextField-BYjjVj_2.js";import{D as J,C as P,a as B,b as F,c as I,S as L,H as N}from"./admin-D2fVXrBE.js";import{S as $}from"./Stack-CclBrxki.js";function z({showtimeId:h}){const[s,d]=o.useState({film_name:"",room_name:"",cinema_name:"",show_date:"",show_time:""});o.useState([]);const[_,S]=o.useState(null),[v,b]=o.useState(!0),[p,n]=o.useState({open:!1,message:"",severity:"success"}),T=W(),g=()=>n(r=>({...r,open:!1})),l=r=>{const{name:t,value:a}=r.target;d(i=>({...i,[t]:a}))};o.useEffect(()=>{(async()=>{var t,a,i,f,w;try{const u=localStorage.getItem("jwt");if(!u){console.error("JWT token is missing"),n({open:!0,message:"JWT token is missing",severity:"error"});return}const x=await fetch(`/api/admin/showtimes/detail/${h}`,{method:"GET",headers:{Authorization:"Bearer "+u}});if(!x.ok)throw new Error("Failed to fetch showtime details");const m=await x.json(),j=((t=m.showTime[0])==null?void 0:t.show_date)||"",D=j?new Date(j).toLocaleDateString("en-CA"):"",y={film_name:((a=m.film[0])==null?void 0:a.film_name)||"",room_name:((i=m.room[0])==null?void 0:i.room_name)||"",cinema_name:((f=m.cinema[0])==null?void 0:f.cinema_name)||"",show_date:D,show_time:((w=m.showTime[0])==null?void 0:w.show_time)||""};d(y),S(y),b(!1)}catch(u){console.error(u),n({open:!0,message:"Lỗi khi tải thông tin suất chiếu",severity:"error"})}})()},[h]);const k=async r=>{r.preventDefault();try{const t=localStorage.getItem("jwt");if(!t){console.error("JWT token is missing"),n({open:!0,message:"JWT token is missing",severity:"error"});return}const a=await fetch(`/api/admin/showtimes/edit/${h}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t},body:JSON.stringify(s)});if(!a.ok)throw new Error("Failed to update showtime");const i=await a.json();console.log(i),n({open:!0,message:"Suất chiếu phim đã được cập nhật thành công!",severity:"success"}),setTimeout(()=>T("/admin/showtime"),1e3)}catch(t){console.error(t),n({open:!0,message:"Có lỗi xảy ra khi cập nhật suất chiếu!",severity:"error"}),d(_)}};return e.jsxs(J,{children:[e.jsxs(P,{children:[e.jsx(B,{title:e.jsx(E,{variant:"h2",children:"Chỉnh sửa thông tin suất chiếu phim"})}),e.jsx(F,{children:v?e.jsx(C,{display:"flex",justifyContent:"center",alignItems:"center",height:"300px",children:e.jsx(I,{})}):e.jsxs("form",{onSubmit:k,children:[e.jsxs($,{spacing:3,children:[e.jsx(c,{name:"film_name",label:"Tên phim",value:s.film_name,onChange:l,required:!0,fullWidth:!0}),e.jsx(c,{name:"room_name",label:"Tên phòng chiếu",value:s.room_name,onChange:l,required:!0,fullWidth:!0}),e.jsx(c,{name:"cinema_name",label:"Tên rạp",value:s.cinema_name,onChange:l,required:!0,fullWidth:!0}),e.jsx(c,{name:"show_date",label:"Ngày chiếu",type:"date",value:s.show_date,onChange:l,required:!0,fullWidth:!0,InputLabelProps:{shrink:!0}}),e.jsx(c,{name:"show_time",label:"Giờ chiếu",type:"time",value:s.show_time,onChange:l,required:!0,fullWidth:!0,InputLabelProps:{shrink:!0}})]}),e.jsx(C,{mt:3,display:"flex",justifyContent:"flex-end",children:e.jsx(q,{type:"submit",variant:"contained",color:"primary",children:"Cập nhật"})})]})})]}),e.jsx(L,{open:p.open,autoHideDuration:4e3,onClose:g,children:e.jsx(A,{onClose:g,severity:p.severity,children:p.message})})]})}function V(){const{id:h}=H();return e.jsxs(e.Fragment,{children:[e.jsx(N,{children:e.jsxs("title",{children:[" ","Chỉnh sửa thông tin suất chiếu | Trang quản trị website bán vé xem phim NHTT"]})}),e.jsx(z,{showtimeId:h})]})}export{V as default};
