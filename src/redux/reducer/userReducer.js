
import {REFESH_SUCCESS } from '../action/refeshUserAction';
import { FECTH_USER_LOGIN_SUCCESS } from '../action/userAction';
const INITIAL_STATE = {
        account:{
            access_token:"",
            refesh_token:"",
            username:"",
            roles:""
        },
        isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FECTH_USER_LOGIN_SUCCESS:
            return {
                ...state, account:{
                    access_token: action.payload.access_token,
                    refesh_token:"",
                    username: action.payload.username,
                    roles: action.payload.data
                },
                isAuthenticated: true
            };

        case REFESH_SUCCESS:
            console.log(INITIAL_STATE)
            return INITIAL_STATE;
        default: return state;
    }
};

export default userReducer;