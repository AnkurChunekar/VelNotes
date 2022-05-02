import { useContext, createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { authReducer, initialAuthState } from "../reducers";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext(initialAuthState);

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);
  const navigate = useNavigate();

  // Login
  const userLoginService = async (userData) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email: userData.email,
        password: userData.password,
      });
      if (response.status === 200) {
        authDispatch({
          type: "LOGIN",
          payload: {
            user: response.data.foundUser,
            token: response.data.encodedToken,
            rememberUser: userData.rememberUser,
          },
        });
        navigate(location?.state?.from?.pathname || "/notes", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error("Error Occured! Please Try again!");
      console.error(error);
    }
  };

  // Signup
  const userSignupService = async (userData) => {
    try {
      const { firstName, lastName, email, password } = userData;

      const response = await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 201) {
        authDispatch({
          type: "SIGNUP",
          payload: {
            user: response.data.createdUser,
            token: response.data.encodedToken,
          },
        });
        navigate(location?.state?.from?.pathname || "/notes", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error("Error Occured! Please Try again!");
      console.error(error);
    }
  };

  // Logout
  const userLogoutService = () => {
    authDispatch({ type: "LOGOUT", payload: { navigate } });
    toast.success("Logout Successfull!");
  };

  const value = {
    authState,
    authDispatch,
    userLoginService,
    userSignupService,
    userLogoutService,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
