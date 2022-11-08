import {authAPI, securityAPI} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};
export type InitialStateTypes = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateTypes => {
    switch (action.type) {
        case SET_USER_DATA:
         case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
type PayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: PayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType =>
    ({type: SET_USER_DATA, payload: {userId,email,login,isAuth}});

type getCaptchaURLSuccessActionType={
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}
export const getCaptchaURLSuccess = (captchaUrl:string ): getCaptchaURLSuccessActionType =>
    ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

export const authUserData = () => async (dispatch: any) => {
    const response = await authAPI.getAuth()
        if (response.data.resultCode === 0 ) {
            const {id, email, login} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch:any) => {
    const response = await authAPI.login(email,password,rememberMe,captcha)
        if (response.data.resultCode === 0) {
            dispatch(authUserData());
        } else {
            if(response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: message}));
        }
}
export const getCaptchaUrl = () => async (dispatch:any) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaURLSuccess(captchaUrl));
}

export const logout = () => async (dispatch:any) => {
    const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
}

export default authReducer;