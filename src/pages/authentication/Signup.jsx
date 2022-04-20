import { Link } from "react-router-dom";
import "./Auth.css";

export function Signup() {
  return (
    <main className="auth-main flex ai-start jc-center">
      <form className="authentication-container flex flex-column ai-left p-md2 m-xs">
        <h1 className="title m-s m-rl0 fs-3 fw-600">Sign up</h1>
        <div className="input-wrapper m-xxxs m-rl0">
          <label htmlFor="email">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            className="input p-xxs m-xxs m-rl0 bd-rad-sm"
          />
        </div>
        <div className="input-wrapper m-xxxs m-rl0">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="johndoe@gmail.com"
            className="input p-xxs m-xxs m-rl0 bd-rad-sm"
          />
          <label className="success-msg m-xxs m-rl0">
            Success! Email entered is correct.
          </label>
        </div>
        <div className="input-wrapper m-xxxs m-rl0">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper bd-rad-sm input-w-btn flex flex-row ai-center m-xxs m-rl0">
            <input type="text" className="p-xxs input" placeholder="password" />
            <div className="p-xxs gray-text input-btn">
              <i className="fa-solid fa-eye"></i>
            </div>
          </div>
          <label className="error-msg">Wrong Password. Try again.</label>
        </div>
        <div className="input-wrapper m-xxs m-rl0">
          <label className="" htmlFor="password">
            Confirm Password
          </label>
          <div className="input-wrapper bd-rad-sm input-w-btn flex flex-row ai-center m-xxs m-rl0">
            <input
              type="text"
              className="p-xxs input"
              placeholder="confirm password"
            />
            <div className="p-xxs gray-text input-btn">
              <i className="fa-solid fa-eye"></i>
            </div>
          </div>
          <label className="error-msg">Passwords do not match.</label>
        </div>
        <p className="m-xxs m-rl0 gray-text fs-6">
          By signing up, you agree to our terms and conditions.
        </p>
        <button type="button" className="btn btn-primary m-xxs m-rl0">
          Sign Up
        </button>
        <p className="m-xxs m-rl0 center-align-text gray-text">
          Already a User?{" "}
          <Link to="/login" className="primary-color-text">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}
