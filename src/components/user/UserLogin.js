import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../myredux/reducers/UserSlice";
import { FaUser } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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


  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

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
              <TextField
                label="Mobile"
                type="text"
                name="mobile"
                id="mobile"
                variant="outlined"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                fullWidth
                required
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="form-group">
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                placeholder="Enter your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility />: <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Button
              id="userloginbtn"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <p id="credentials">
              <span id="note">Note:</span> Mobile: 7702145910 and Password:
              sharath_med@123
            </p>
          </form>
          <div>
            <Button
              type="button"
              id="guestbutton"
              onClick={handleGuestLogin}
              variant="contained"
              color="primary"
              fullWidth
            >
              Continue as Guest
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
