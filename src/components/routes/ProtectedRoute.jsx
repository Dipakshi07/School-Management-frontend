import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  console.log("TOKEN:", token);
  console.log("USER STRING:", userString);

  if (!token || !userString) {
    console.log("REDIRECTING: Token or user missing");
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(userString);
  } catch (error) {
    console.error("USER JSON ERROR:", error);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }

  console.log("USER:", user);
  console.log("USER ROLE:", user.role);
  console.log("ALLOWED ROLES:", allowedRoles);

  if (!allowedRoles.includes(user.role)) {
    console.log("ROLE NOT ALLOWED");

    return <Navigate to="/login" replace />;
  }

  console.log("ACCESS GRANTED");

  return children;
};

export default ProtectedRoute;