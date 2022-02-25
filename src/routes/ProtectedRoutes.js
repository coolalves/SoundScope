import { Navigate, Outlet } from "react-router";
import { useRecoilValue } from "recoil";
import { getIsLogged } from "../recoil/selectors/getIslogged";
import Login from "../components/authentication/Login";

const useAuth = ()=> {
    const user = useRecoilValue(getIsLogged)
    return user && user.loggedIn
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet/> : <Navigate to="/"/>
};

export default ProtectedRoutes