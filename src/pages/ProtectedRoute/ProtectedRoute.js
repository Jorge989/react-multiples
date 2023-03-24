import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((user) => store.user.token);
  if (!user) {
    return <Redirect to="/" />;
  }
  return children;
};
export default ProtectedRoute;
