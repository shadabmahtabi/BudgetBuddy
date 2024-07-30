import React, { useState } from "react";
import css from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [changeForm, setChangeForm] = useState(false);

  const { loading, error } = useSelector((state) => state.user);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  };

  const LoginHandler = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      return toast.error("Invalid email address");
    }

    let credentials = {
      email,
      password,
    };

    dispatch(loginUser(credentials)).then((result) => {
      if (result.error) {
        toast.error(error);
      } else {
        // toast.success("Logged in successfully");
        setEmail("");
        setPassword("");
        navigate("/");
      }
    });
  };

  const RegisterHandler = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      return toast.error("Invalid email address");
    }

    let credentials = {
      email,
      password,
      firstname,
      lastname,
    };

    dispatch(registerUser(credentials)).then((result) => {
      if (result.error) {
        return;
        // console.log(result.error.message);
        // toast.error("Error Registration!");
      } else {
        // toast.success("Registered successfully");
        setEmail("");
        setPassword("");
        setFirstname("");
        setLastname("");
        navigate("/");
      }
    });
  };
  
  return (
    <div className={css.formMain}>
      <div className={css.formDiv}>
        {changeForm ? (
          <form
            onSubmit={LoginHandler}
            className={`${css.forms} ${css.loginForm}`}
          >
            <h2 className={css.formHeading}>Login yourself here</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={css.emailInput}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoComplete="true"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={css.passwordInput}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <h5 className={css.addLines}>
              Don't have an account?{" "}
              <span
                className={css.changeFormBtn}
                onClick={() => setChangeForm(!changeForm)}
              >
                Register now
              </span>
            </h5>
            {loading ? (
              <button className={css.submitBtn}>Loading...</button>
            ) : (
              <button className={css.submitBtn}>Login</button>
            )}
          </form>
        ) : (
          <form
            onSubmit={RegisterHandler}
            className={`${css.forms} ${css.registerForm}`}
          >
            <h2 className={css.formHeading}>Register yourself here</h2>
            <div className={css.name}>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                className={css.nameInput}
                onChange={(e) => setFirstname(e.target.value)}
                value={firstname}
                required
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                className={css.nameInput}
                onChange={(e) => setLastname(e.target.value)}
                value={lastname}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={css.emailInput}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={css.passwordInput}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <h5 className={css.addLines}>
              Already have an account?{" "}
              <span
                className={css.changeFormBtn}
                onClick={() => setChangeForm(!changeForm)}
              >
                Login now
              </span>
            </h5>
            {loading ? (
              <button className={css.submitBtn}>Loading...</button>
            ) : (
              <button className={css.submitBtn}>Register</button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
