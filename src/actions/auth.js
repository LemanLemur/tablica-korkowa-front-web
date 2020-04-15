import {
    LOG_IN,
    LOG_IN_ERROR,
    LOG_OUT,
    CLOSE_LOG_IN_MSG,
    LOG_IN_SUCCESS,
} from './constants/actionTypes';

export const userLogIn = (user, registerType) => {
    return {
        type: LOG_IN,
        payload: user,
        provider: registerType
    };
};

export const userLogInSucess = () => {
    return {
        type: LOG_IN_SUCCESS,
    };
};

export const userLogInError = (error) => {
    return {
        type: LOG_IN_ERROR,
        payload: error
    };
};

export const userLogOut = () => {
    return {
        type: LOG_OUT,
    };
};

export const closeLogInMsg = () => {
    return {
        type: CLOSE_LOG_IN_MSG,
    };
};