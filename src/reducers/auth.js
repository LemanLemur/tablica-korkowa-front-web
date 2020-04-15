import {
  LOG_IN,
  LOG_IN_ERROR,
  LOG_IN_SUCCESS,
  LOG_OUT,
  CLOSE_LOG_IN_MSG,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  ACCOUNT_DELETE_SUCCESS
} from "../constants/actionTypes";

const INIT_STATE = {
  alertMessage: "",
  showMessage: false,
  error: null,
  initURL: "/",
  authUser: localStorage.getItem("uid"),
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        authUser: action.payload.uid,
        mail: action.payload.email,
        provider: action.provider,
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        alertMessage: "auth/success-login",
        showMessage: true,
        error: false,
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        alertMessage: "auth/success-register",
        showMessage: true,
        error: false,
      };
    }
    case ACCOUNT_DELETE_SUCCESS: {
      return {
        ...state,
        alertMessage: "auth/success-deleted",
        showMessage: true,
        error: false,
      };
    }
    case LOG_IN_ERROR: {
      return {
        ...state,
        showMessage: true,
        alertMessage: action.payload.code,
        error: true,
      };
    }
    case SIGN_UP_ERROR: {
      return {
        ...state,
        showMessage: true,
        alertMessage: action.payload.code,
        error: true,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        authUser: null,
      };
    }
    case CLOSE_LOG_IN_MSG: {
      return {
        ...state,
        alertMessage: "",
        showErrorMessage: false,
        error: null,
      };
    }
    default:
      return state;
  }
};
