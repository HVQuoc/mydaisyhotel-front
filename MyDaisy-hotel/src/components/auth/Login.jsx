import { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../utils/ApiFunctions'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from './AuthProvider'

const Login = () => {
    const [errMessage, setErrMessage] = useState("")
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const { handleLogin } = useContext(AuthContext)
    const location = useLocation()
    const redirectUrl = location.state?.path || "/"

    const handleInputChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await loginUser(login)
            if (success) {
                const token = success.token
                handleLogin(token)
                navigate(redirectUrl, {replace: true})
                // window.location.reload()
            }
        } catch (err) {
            setErrMessage("Invalid username or password.", err?.message)
        } finally {
            setTimeout(() => {
                setErrMessage("")
            }, 4000)
        }
    }

    return (
        <section className="col-6 my-5 p-5">
            {errMessage && (<p className="alert alert-danger">{errMessage}</p>)}
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                    <div>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={login.email}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
                    <div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={login.password}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <button
                        type="submit"
                        className="btn btn-hotel"
                        style={{ "marginRight": "10px" }}
                    >
                        Login
                    </button>
                    <span className="mx-2">
                        Don't have an account yet? <Link to={"/register"}>Register</Link>
                    </span>
                </div>
            </form>
        </section>
    )
}

export default Login
