import { Navigate, useLocation } from "react-router-dom"
const RequiredAuth = ({ children }) => {
    const user = localStorage.getItem("userId")
    if (!user) {
        return <Navigate to={"/login"} state={{ path: location.pathname }} />
    }
    return children
}
export default RequiredAuth
