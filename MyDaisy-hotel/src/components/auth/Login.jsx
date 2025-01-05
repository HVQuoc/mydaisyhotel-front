import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/ApiFunctions";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const [errMessage, setErrMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const location = useLocation();
  const redirectUrl = location.state?.path || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await loginUser(login);
      if (success) {
        const token = success.token;
        handleLogin(token);
        navigate(redirectUrl, { replace: true });
        // window.location.reload()
      }
    } catch (err) {
      setErrMessage("Invalid username or password.", err?.message);
    } finally {
      setTimeout(() => {
        setErrMessage("");
      }, 4000);
    }
  };

  return (
    <div className="d-flex justify-content-around text-center">
      <section className="col-4 my-5 p-5">
        <div className="row">
          {errMessage && <p className="alert alert-danger">{errMessage}</p>}
        </div>
        <h2 className="mb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <input
              placeholder="Enter your email address"
              id="email"
              name="email"
              type="email"
              value={login.email}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="row mb-3">
            <input
              placeholder="Your password here"
              id="password"
              name="password"
              type="password"
              value={login.password}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="row mb-3">
            <button type="submit" className="btn-hotel">
              Login
            </button>
          </div>
          <div className="fs-6">
            <p className="d-inline">Don't have an account yet?</p>{" "}
            <Link to={"/register"}>Register</Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
