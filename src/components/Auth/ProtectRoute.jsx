import { useAuth } from "../../Hooks/AuthContext";
import { Navigate , useLocation } from "react-router-dom";
import UnAuthPage from "../Alert/UnAuthPage";


const ProtectRoute = ({ children , role }) => {

  const location = useLocation();

  const { isAuthenticated , userRole , isError } = useAuth();

  if( !isAuthenticated && isError  ){
    return <Navigate to="/login" state={{ from : location }} replace/>
  }else{
    if( userRole === role || role === "chat" ){
      return <>{children}</>
    }else{
      return <><UnAuthPage/></>; 
    }
  }
}

export default ProtectRoute;