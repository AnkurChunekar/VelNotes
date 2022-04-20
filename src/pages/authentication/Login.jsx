import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context";
import { TextInput, PasswordInput } from "../../components";
import "./Auth.css";

export function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    rememberUser: false,
  });

  const { userLoginService } = useAuth();

  const handleLoginClick = (e) => {
    e.preventDefault();

    if (userData.email.trim() === "" && userData.password.trim() === "") {
      toast.error("Email and Password cannot be empty!");
    } else {
      userLoginService(userData);
    }
  };

  const handleGuestLoginClick = () => {
    setUserData({
      email: "johndoe@gmail.com",
      password: "johnDoe123",
      rememberUser: true,
    });
  };

  return (
    <>
      <main className="main-container flex ai-start jc-center">
        <form className="authentication-container flex flex-column ai-left p-md2 m-xs">
          <h1 className="title m-s m-rl0 fs-3 fw-600">Log in</h1>

          <TextInput
            labelText="Email"
            id="email"
            name="email"
            placeholder="johndoe@gmail.com"
            userData={userData}
            setUserData={setUserData}
            type="email"
          />

          <PasswordInput
            labelText="Password"
            id="password"
            name="password"
            placeholder="password"
            userData={userData}
            setUserData={setUserData}
          />

          <div className="input-wrapper checkbox">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              checked={userData.rememberUser}
              onChange={() => {
                setUserData((userData) => ({
                  ...userData,
                  rememberUser: !userData.rememberUser,
                }));
              }}
            />
            <label htmlFor="remember-me">Remember Me</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary m-xxs m-rl0"
            onClick={handleLoginClick}
          >
            LOGIN
          </button>
          <p className="m-xxs m-rl0 center-align-text gray-text">
            New User?{" "}
            <Link className="primary-color-text" to="/signup">
              Sign Up!
            </Link>
            .
          </p>
          <button
          type="button"
            onClick={handleGuestLoginClick}
            className="primary-color-text center-align-text m-xxs m-rl0 transparent-bg"
          >
            Use Guest Credentials.
          </button>
        </form>
      </main>
    </>
  );
}
