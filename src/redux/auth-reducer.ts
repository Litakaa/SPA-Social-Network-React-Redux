import {ResultCodeForCaptcha, ResultCodesEnum} from "../API/api";
import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsType} from "./redux-store";
import authAPI from '../API/authAPI'
import {securityAPI} from "../API/securityAPI";



let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};
export type InitialStateTypes = typeof initialState
type AuthActionsTypes = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<AuthActionsTypes | FormAction>

const authReducer = (state = initialState, action: AuthActionsTypes): InitialStateTypes => {
    switch (action.type) {
        case "auth/SET_USER_DATA":
         case "auth/GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
export const actions = {
    setAuthUserData:(userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
            type: "auth/SET_USER_DATA", payload: {userId,email,login,isAuth}
    } as const),
    getCaptchaURLSuccess:(captchaUrl:string ) => ({
        type: "auth/GET_CAPTCHA_URL_SUCCESS", payload: {captchaUrl}
    } as const)
}
export const authUserData = (): ThunkType => {
    return async (dispatch) => {
        const getData = await authAPI.getAuth()
        if (getData.resultCode === ResultCodesEnum.Success) {
            const {id, email, login} = getData.data;
            dispatch(actions.setAuthUserData(id, email, login, true));
        }
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        const loginData = await authAPI.login(email, password, rememberMe, captcha)
        if (loginData.resultCode === ResultCodesEnum.Success) {
            await dispatch(authUserData());
        } else {
            if (loginData.resultCode === ResultCodeForCaptcha.CaptchaISRequired) {
                await dispatch(getCaptchaUrl());
            }
            const message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error"
            dispatch(stopSubmit("login", {_error: message}));
        }
    }
}
export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        const data = await securityAPI.getCaptchaUrl();
        const captchaUrl = data.url;
        dispatch(actions.getCaptchaURLSuccess(captchaUrl));
    }
}
export const logout = (): ThunkType => {
    return async (dispatch) => {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }
    }
}
export default authReducer;