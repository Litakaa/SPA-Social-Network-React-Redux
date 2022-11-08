import {APIResponseType, instance, ResultCodeForCaptcha, ResultCodesEnum} from "./api";


type GetAuthDataType = {
    id: number,
    email: string,
    login: string
}
type LoginAuthDataType = {
    userId: number
}
const authAPI = {
    getAuth() {
        return instance.get<APIResponseType<GetAuthDataType>>(`/auth/me`).then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginAuthDataType, ResultCodesEnum | ResultCodeForCaptcha>>(`/auth/login`,
            {email, password, rememberMe, captcha})
            .then(response => response.data);
    },
    logout() {
        return instance.delete(`/auth/login`);
    }
}
export default authAPI;