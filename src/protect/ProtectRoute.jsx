import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // ไม่ได้ login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // เป็น user ธรรมดา แต่พยายามเข้าหน้าที่เป็น adminOnly
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/onrenting" replace />;
  }

  return children;
}

export default ProtectedRoute;