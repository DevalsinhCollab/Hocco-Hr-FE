import { Navigate, Outlet } from "react-router-dom";
 
function ProtectedRoute() {
 
  let auth = { authUser: false };
 
  if (localStorage.getItem("authUser")) {
    auth = { authUser: true };
  }
 
  return auth.authUser ? <Outlet /> : <Navigate to={'/login'} />;
}

export default ProtectedRoute;