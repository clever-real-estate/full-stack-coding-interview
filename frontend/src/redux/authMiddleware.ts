import { Dispatch, Middleware } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { logout, setCredentials } from "./authSlice";

type AuthAction = ReturnType<typeof setCredentials | typeof logout>;

export const authMiddleware: Middleware<Dispatch<AuthAction>> =
  () => (next) => (action) => {
    if (setCredentials.match(action)) {
      Cookies.set("token", action.payload.token, { expires: 7 });
    } else if (logout.match(action)) {
      Cookies.remove("token");
    }
    return next(action);
  };

export default authMiddleware;
