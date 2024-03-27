import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../myredux/reducers/UserSlice";
import { FaUser } from "react-icons/fa";
import "./UserLogin.css";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state) => state.userlogin.loading);
  const isUserLogin = useSelector((state) => state.userlogin.isUserLogin);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userCredentials = { mobile, password };
    dispatch(loginUser(userCredentials, navigate));
  };

  const handleGuestLogin = () => {
    const guestCredentials = {
      mobile: "7702145910",
      password: "sharath_med@123",
    };
    dispatch(loginUser(guestCredentials, navigate));
  };

  useEffect(() => {
    if (isUserLogin === true) {
      navigate("/userpage");
    }
  }, [isUserLogin, navigate]);

  return (
    <div id="userlogin">
      <div className="userforms">
        <div className="headings">
          <h1>
            User<span id="login">Login</span>
            <span id="user-icon">
              <FaUser />
            </span>
          </h1>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="mobile">
                Mobile<sup className="astrick">&#42;</sup>
              </label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="Enter your mobile number"
                className="form-control"
                value={mobile}
                maxLength={10}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password<sup className="astrick">&#42;</sup>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                id="show-password"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            <button className="btn" id="userloginbtn" type="submit">
              {loading ? "Logging in..." : "Login"}
            </button>
            <p id="credentials">
              <span id="note">Note:</span> Mobile: 7702145910 and Password:
              sharath_med@123
            </p>
          </form>
          <div>
            <button type="button" id="guestbutton" onClick={handleGuestLogin}>
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
