import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context";
import { checkIfAllInputsAreNotEmpty } from "../../helpers";
import { TextInput, PasswordInput } from "../../components";
import "./Auth.css";

export function Signup() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    passwordsDifferent: false,
  });

  const { userSignupService } = useAuth();

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (!checkIfAllInputsAreNotEmpty(userData)) {
      toast.error("Inputs cannot be Empty");
    } else if (userData.password !== userData.confirmPassword) {
      setUserData({ ...userData, passwordsDifferent: true });
    } else {
      userSignupService(userData);
    }
  };

  return (
    <>
      <main className="main-container flex flex-center">
        <form className="authentication-container flex flex-column ai-left p-md2 m-xs">
          <h1 className="title m-s m-rl0 fs-3 fw-600">Sign up</h1>
          <div className="flex c-gap-1rem">
            <TextInput
              labelText="First Name"
              id="firstName"
              name="firstName"
              placeholder="John"
              userData={userData}
              setUserData={setUserData}
              type="text"
            />
            <TextInput
              labelText="Last Name"
              id="lastName"
              name="lastName"
              placeholder="Doe"
              userData={userData}
              setUserData={setUserData}
              type="text"
            />
          </div>
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

          <PasswordInput
            labelText="Confirm Password"
            id="confirm-password"
            name="confirmPassword"
            placeholder="confirm password"
            userData={userData}
            setUserData={setUserData}
          />

          <p className="m-xxs m-rl0 gray-text fs-6">
            By signing up, you agree to our terms and conditions.
          </p>
          <button
            type="submit"
            className="btn btn-primary m-xxs m-rl0"
            onClick={handleSubmitClick}
          >
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
    </>
  );
}
