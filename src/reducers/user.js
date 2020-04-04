import { LOAD_USER, START_LOAD_DATA } from "../constants/actionTypes";

const INIT_STATE = {
  id: localStorage.getItem("user_id"),
  avatar: localStorage.getItem("user_a"),
  firstName: localStorage.getItem("user_n"),
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOAD_USER: {
      return {
        ...state,
        id: action.payload.id,
        avatar: action.payload.avatar,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        telephone: action.payload.telephone,
        loading: false
      };
    }
    case START_LOAD_DATA: {
      return {
        ...state,
        loading: true
      };
    }
    default:
      return state;
  }
};
