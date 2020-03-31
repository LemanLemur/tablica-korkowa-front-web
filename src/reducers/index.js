import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import Auth from "./auth";
import User from "./user";
// import Settings from './Settings';

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: Auth,
    user: User,
    //   settings: Settings,
  });
