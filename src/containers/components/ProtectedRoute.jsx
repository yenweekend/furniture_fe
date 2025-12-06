import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, redirectTo }) => {
  const { account, loading, isRefreshing } = useSelector((state) => state.auth);

  if (loading || !isRefreshing) return <p>Loading...</p>;
  console.log(account);
  return account ? children : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
