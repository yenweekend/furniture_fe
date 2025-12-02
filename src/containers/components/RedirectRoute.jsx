import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RedirectRoute = ({ children, redirectTo }) => {
  const { account, loading } = useSelector((state) => state.auth);
  if (loading) return <p>Loading...</p>;
  return account ? <Navigate to={redirectTo} replace /> : children; // loggedin  => home page
};

export default RedirectRoute;
