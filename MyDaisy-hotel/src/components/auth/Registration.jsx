import { useState } from "react";
import { registerAccount } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setRegistration({ ...registration, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const result = await registerAccount(registration);
      setSuccessMessage(result);
      setErrMessage("");
      setRegistration({ firstName: "", lastName: "", email: "", password: "" });
    } catch (err) {
      setSuccessMessage("");
      setErrMessage(`${err?.message}`);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrMessage("");
    }, 4000);
  };

  return (
    <div className="d-flex justify-content-around text-center">
      <section className="container col-4 mt-5 mb-5">
        <div className="row">
          {errMessage && <p className="alert alert-danger">{errMessage}</p>}
          {successMessage && (
            <p className="alert alert-success">{successMessage}</p>
          )}
        </div>
        <h2 className="mb-3">Register</h2>
        <form onSubmit={handleRegistration}>
          <div className="mb-3 row">
            <input
              placeholder="Enter your first name"
              id="firstName"
              name="firstName"
              type="text"
              className="form-control"
              value={registration.firstName}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3 row">
            <input
              placeholder="Enter your last name"
              id="lastName"
              name="lastName"
              type="text"
              className="form-control"
              value={registration.lastName}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3 row">
            <input
              placeholder="Email address"
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={registration.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3 row">
            <input
              placeholder="Password"
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={registration.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 row mb-3">
            <button type="submit" className="btn btn-hotel">
              Register
            </button>
          </div>
          <div>
            <span style={{ marginLeft: "10px" }}>
              Already have an account? <Link to={"/login"}>Login</Link>
            </span>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Registration;
