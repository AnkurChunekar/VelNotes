import { toast } from "react-toastify";

const initialAuthState = { user: "", token: "" };

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { token, user, rememberUser } = action.payload;
      if (rememberUser) {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          })
        );
      }
      toast.success(`Welcome Back, ${user.firstName}!`);
      return { user, token };

    case "SIGNUP":
      toast.success(`Welcome, ${action.payload.user.firstName}!`);
      return { user: action.payload.user, token: action.payload.token };

    case "LOGOUT":
      action.payload.navigate("/");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return initialAuthState;

    default:
      return state;
  }
};

export { authReducer, initialAuthState };
