import { Outlet } from "react-router";
import { useRecoilValue } from "recoil";
import { getUser } from "../recoil/selectors/getUsername";
import Login from "../components/authentication/Login";


const useAuth = ()=>{
    const isLoggedIn = useRecoilValue(getUser)
    let user

    if (isLoggedIn == ""){
        user = {loggedIn: false}
    } else{
        user = {loggedIn: true}
    }
    return user && user.loggedIn
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Login/>
};

export default ProtectedRoutes