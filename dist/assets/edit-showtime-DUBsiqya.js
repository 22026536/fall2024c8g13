import{r as h,q as E,j as e,T as q,B as C,K as m,z as W,A,Z as H}from"./TextField-DZyt019d.js";import{D as P,C as B,a as F,b as I,c as L,S as N,H as $}from"./admin-Bp2qA-3f.js";import{S as z}from"./Stack-CFKMML1m.js";function J({showtimeId:o}){const[n,d]=h.useState({film_name:"",room_name:"",cinema_name:"",show_date:"",show_time:""}),[_,S]=h.useState(null),[b,v]=h.useState(!0),[p,c]=h.useState({open:!1,message:"",severity:"success"}),T=E(),g=()=>c(s=>({...s,open:!1}));h.useEffect(()=>{(async()=>{var t,a,r,f,w;try{const u=localStorage.getItem("jwt");if(!u){console.error("JWT token is missing");return}const x=await fetch(`/api/admin/showtimes/detail/${o}`,{method:"GET",headers:{Authorization:"Bearer "+u}});if(!x.ok)throw new Error("Failed to fetch showtime details");const i=await x.json();console.log(i);const j=((t=i.showTime[0])==null?void 0:t.show_date)||"",k=j?new Date(j).toLocaleDateString("en-CA"):"",y={film_name:((a=i.film[0])==null?void 0:a.film_name)||"",room_name:((r=i.room[0])==null?void 0:r.room_name)||"",cinema_name:((f=i.cinema[0])==null?void 0:f.cinema_name)||"",show_date:k,show_time:((w=i.showTime[0])==null?void 0:w.show_time)||""};d(y),S(y),v(!1)}catch(u){console.error(u),c({open:!0,message:"Lỗi khi tải thông tin suất chiếu",severity:"error"})}})()},[o]);const l=s=>{const{name:t,value:a}=s.target;d(r=>({...r,[t]:a}))},D=async s=>{s.preventDefault();try{const t=localStorage.getItem("jwt");if(!t){console.error("JWT token is missing");return}const a=await fetch(`/api/admin/showtimes/edit/${o}`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:"Bearer "+t},body:JSON.stringify(n)});if(!a.ok)throw new Error("Failed to update showtime");const r=await a.json();console.log(r),c({open:!0,message:"Suất chiếu phim đã được cập nhật thành công!",severity:"success"}),setTimeout(()=>T("/admin/showtime"),1e3)}catch(t){console.error(t),c({open:!0,message:"Có lỗi xảy ra khi cập nhật suất chiếu!",severity:"error"}),d(_)}};return e.jsxs(P,{children:[e.jsxs(B,{children:[e.jsx(F,{title:e.jsx(q,{variant:"h2",children:"Chỉnh sửa thông tin suất chiếu phim"})}),e.jsx(I,{children:b?e.jsx(C,{display:"flex",justifyContent:"center",alignItems:"center",height:"300px",children:e.jsx(L,{})}):e.jsxs("form",{onSubmit:D,children:[e.jsxs(z,{spacing:3,children:[e.jsx(m,{name:"film_name",label:"Tên phim",value:n.film_name,onChange:l,required:!0,fullWidth:!0}),e.jsx(m,{name:"room_name",label:"Tên phòng chiếu",value:n.room_name,onChange:l,required:!0,fullWidth:!0}),e.jsx(m,{name:"cinema_name",label:"Tên rạp",value:n.cinema_name,onChange:l,required:!0,fullWidth:!0}),e.jsx(m,{name:"show_date",label:"Ngày chiếu",type:"date",value:n.show_date,onChange:l,required:!0,fullWidth:!0,InputLabelProps:{shrink:!0}}),e.jsx(m,{name:"show_time",label:"Giờ chiếu",type:"time",value:n.show_time,onChange:l,required:!0,fullWidth:!0,InputLabelProps:{shrink:!0}})]}),e.jsx(C,{mt:3,display:"flex",justifyContent:"flex-end",children:e.jsx(W,{type:"submit",variant:"contained",color:"primary",children:"Cập nhật"})})]})})]}),e.jsx(N,{open:p.open,autoHideDuration:4e3,onClose:g,children:e.jsx(A,{onClose:g,severity:p.severity,children:p.message})})]})}function R(){const{id:o}=H();return e.jsxs(e.Fragment,{children:[e.jsx($,{children:e.jsxs("title",{children:[" ","Chỉnh sửa thông tin suất chiếu | Trang quản trị website bán vé xem phim NHTT"]})}),e.jsx(J,{showtimeId:o})]})}export{R as default};