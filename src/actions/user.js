import {
    LOAD_USER,
    START_LOAD_DATA
} from './constants/actionTypes';

export const loadUserData = (user) => {
    return {
        type: LOAD_USER,
        payload: user
    };
};

export const startLoadData = () => {
    return {
        type: START_LOAD_DATA
    };
};