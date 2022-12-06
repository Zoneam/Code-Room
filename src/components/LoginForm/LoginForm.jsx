import { useState } from "react";
import * as usersService from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const loginSuccess = (user) => toast.success(`Welcome ${user}`);
  const loginFailed = () => toast.error(`Log In Failed - Try Again`);

  const navigate = useNavigate();
  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();

    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
      navigate("/myposts");
      loginSuccess(user.name);
    } catch {
      loginFailed();
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <div className="form-container" onSubmit={handleSubmit} style={{width:'50%', margin:'50px auto'}}>
      <form autoComplete="on">
        <p>Please login to your account</p>

        <div className="form-outline mb-4">
          <input
            type="email"
            id="form2Example11"
            className="form-control"
            placeholder="Email address"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />

        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            placeholder="Password"
            id="form2Example22"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
         
        </div>

        <div className="text-center pt-1 mb-5 pb-1">
          <button
            className="btn btn-outline-primary"
            type="submit"
          >
            Log in
          </button>
        </div>

        <div className="d-flex align-items-center justify-content-center pb-4">
          <p className="mb-0 me-2">Don't have an account?</p>
          <Link to={"/signup"} style={{marginLeft: '15px'}}><button type="button" className="btn btn-outline-danger">
            Create new
          </button></Link>


        </div>
      </form>
    </div>
  );
}
