import { useState } from "react";
import * as usersService from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function LoginForm({ setUser, gUser, setGuser }) {

  const loginSuccess = (user) => toast.success(`Welcome ${user}`);
  const loginFailed = () => toast.error(`Log In Failed - Try Again`);

  const navigate = useNavigate();
  function handleChange(evt) {
    setGuser({ ...gUser, password: evt.target.value });
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();

    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.signUp(gUser);
      setUser(user);
      navigate("/myposts");
      loginSuccess(user.name);
    } catch {
      loginFailed();
    }
  }

  return (
    <div className="form-container" onSubmit={handleSubmit} style={{width:'50%', margin:'50px auto'}}>
      <form autoComplete="on">
        <img src={gUser.imageUrl} style={{borderRadius:'50%'}} alt="" />
        <p>Please Enter New Password</p>

        <div className="form-outline mb-4">
          <input
            type="password"
            placeholder="Password"
            id="form2Example22"
            className="form-control"
            name="password"
            value={gUser.password}
            onChange={handleChange}
            required
          />
         
        </div>

        <div className="text-center pt-1 mb-5 pb-1">
          <button
            className="btn btn-outline-primary"
            type="submit"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
