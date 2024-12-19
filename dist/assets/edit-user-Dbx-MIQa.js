import{r as l,q as I,j as e,T as g,B as o,K as u,z as T,M as _,ab as H,A as N,Z as P}from"./TextField-DZyt019d.js";import{D as B,C as L,a as R,b as U,c as q,T as z,d as A,e as O,f as w,g as a,h as V,S as $,H as K}from"./admin-Bp2qA-3f.js";import{S as M}from"./Stack-CFKMML1m.js";function J({userId:c}){const[s,x]=l.useState({username:"",user_img:"",email:"",phone_number:"",role:0,status:0}),[j,S]=l.useState([]),[f,b]=l.useState(""),D=[{label:"Người dùng",value:0},{label:"Quản trị viên",value:1}],W=[{label:"Đang hoạt động",value:1},{label:"Không hoạt động",value:0}],[y,v]=l.useState(!0),[p,m]=l.useState({open:!1,message:"",severity:"success"}),k=I(),C=()=>m(n=>({...n,open:!1}));l.useEffect(()=>{(async()=>{try{const t=localStorage.getItem("jwt");if(!t){console.error("JWT token is missing");return}const r=await fetch(`/api/admin/users/detail/${c}`,{method:"GET",headers:{Authorization:"Bearer "+t}});if(!r.ok)throw new Error("Failed to fetch user details");const h=await r.json(),i=h.user[0]||{};x({username:i.username,user_img:i.user_img,email:i.email,phone_number:i.phone_number,role:i.role,status:i.status}),S(h.order||[]),b(i.user_img||""),v(!1)}catch(t){console.error(t),m({open:!0,message:"Lỗi khi tải thông tin người dùng",severity:"error"}),v(!1)}})()},[c]);const d=n=>{const{name:t,value:r}=n.target;x(h=>({...h,[t]:r}))},E=n=>{const t=n.target.files[0];if(x(r=>({...r,user_img:t})),t){const r=URL.createObjectURL(t);b(r)}},F=async n=>{n.preventDefault();const t=new FormData;t.append("username",s.username),t.append("email",s.email),t.append("phone_number",s.phone_number),t.append("role",s.role),t.append("status",s.status),s.user_img&&t.append("user_img",s.user_img);try{const r=localStorage.getItem("jwt");if(!r){console.error("JWT token is missing");return}if(!(await fetch(`/api/admin/users/edit/${c}`,{method:"PATCH",headers:{Authorization:"Bearer "+r},body:t})).ok)throw new Error("Failed to update user");m({open:!0,message:"Thông tin người dùng đã được cập nhật thành công!",severity:"success"}),setTimeout(()=>k(-1),1e3)}catch{m({open:!0,message:"Có lỗi xảy ra khi cập nhật thông tin người dùng!",severity:"error"})}};return e.jsx(B,{children:e.jsxs(L,{children:[e.jsx(R,{title:e.jsx(g,{variant:"h2",children:"Chỉnh sửa thông tin người dùng"})}),e.jsx(U,{children:y?e.jsx(o,{display:"flex",justifyContent:"center",alignItems:"center",height:"300px",children:e.jsx(q,{})}):e.jsxs(e.Fragment,{children:[e.jsxs("form",{onSubmit:F,children:[e.jsxs(M,{spacing:3,children:[e.jsx(u,{fullWidth:!0,label:"Tên người dùng",name:"username",value:s.username,onChange:d,required:!0}),e.jsx(u,{fullWidth:!0,label:"Email",name:"email",type:"email",value:s.email,onChange:d,required:!0}),e.jsxs(o,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:2},children:[f?e.jsx(o,{children:e.jsx("img",{src:f,alt:"Current Profile",style:{display:"block",width:"100%",maxWidth:"200px",borderRadius:"8px",margin:"0 auto"}})}):e.jsx(o,{sx:{width:"100%",maxWidth:"200px",height:"200px",display:"flex",justifyContent:"center",alignItems:"center",border:"1px dashed gray",borderRadius:"8px",backgroundColor:"#f4f6f8"},children:e.jsx(g,{variant:"body2",color:"text.secondary",children:"Chưa có ảnh đại diện"})}),e.jsxs(T,{variant:"outlined",component:"label",size:"small",sx:{color:"gray",borderColor:"gray",textTransform:"none"},children:["Tải ảnh đại diện",e.jsx("input",{type:"file",hidden:!0,accept:"image/*",onChange:E})]})]}),e.jsx(u,{fullWidth:!0,label:"Số điện thoại",name:"phone_number",value:s.phone_number,onChange:d,required:!0}),e.jsx(u,{fullWidth:!0,select:!0,label:"Vai trò",name:"role",value:s.role,onChange:d,children:D.map(n=>e.jsx(_,{value:n.value,children:n.label},n.value))}),e.jsx(u,{fullWidth:!0,select:!0,label:"Trạng thái",name:"status",value:s.status,onChange:d,children:W.map(n=>e.jsx(_,{value:n.value,children:n.label},n.value))})]}),e.jsx(o,{mt:3,display:"flex",justifyContent:"flex-end",children:e.jsx(T,{type:"submit",variant:"contained",color:"primary",disabled:y,children:"Cập nhật"})})]}),s.role==0?e.jsxs(o,{mt:5,children:[e.jsx(g,{variant:"h2",gutterBottom:!0,children:"Lịch sử đặt vé"}),j.length>0?e.jsx(z,{component:H,children:e.jsxs(A,{children:[e.jsx(O,{children:e.jsxs(w,{children:[e.jsx(a,{children:"Mã Đơn Hàng"}),e.jsx(a,{children:"Ngày Đặt Vé"}),e.jsx(a,{children:"Tên Phim"}),e.jsx(a,{children:"Tên Rạp"}),e.jsx(a,{children:"Tên Phòng"}),e.jsx(a,{children:"Ngày Chiếu"}),e.jsx(a,{children:"Tổng Tiền"})]})}),e.jsx(V,{children:j.map(n=>e.jsxs(w,{children:[e.jsx(a,{sx:{fontWeight:"medium"},children:n.order_id}),e.jsx(a,{sx:{fontWeight:"medium"},children:new Date(n.order_date).toLocaleDateString()}),e.jsx(a,{sx:{fontWeight:"medium"},children:n.film_name}),e.jsx(a,{sx:{fontWeight:"medium"},children:n.cinema_name}),e.jsx(a,{sx:{fontWeight:"medium"},children:n.room_name}),e.jsx(a,{sx:{fontWeight:"medium"},children:new Date(n.show_date).toLocaleDateString()}),e.jsx(a,{sx:{fontWeight:"medium"},children:new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND"}).format(n.total_price)})]},n.order_id))})]})}):e.jsx(g,{variant:"body1",color:"text.secondary",mt:2,children:"Không có đơn hàng nào đã được đặt."})]}):null]})}),e.jsx($,{open:p.open,autoHideDuration:4e3,onClose:C,anchorOrigin:{vertical:"bottom",horizontal:"center"},children:e.jsx(N,{onClose:C,severity:p.severity,sx:{width:"100%"},children:p.message})})]})})}function X(){const{id:c}=P();return e.jsxs(e.Fragment,{children:[e.jsx(K,{children:e.jsxs("title",{children:[" ","Chỉnh sửa thông tin người dùng | Trang quản trị website bán vé xem phim NHTT"]})}),e.jsx(J,{userId:c})]})}export{X as default};
