import {
    LOAD_USER,
} from './constants/actionTypes';

export const loadUserData = (user) => {
    return {
        type: LOAD_USER,
        payload: user
    };
};