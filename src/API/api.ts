import axios from "axios";
import {UsersType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "f95bba2a-83a8-4e93-a291-751c5a89351c"
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaISRequired = 10
}
export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number,
    error: string | null
}
export type APIResponseType<Data = {}, ResultCodes = ResultCodesEnum> = {
    data: Data
    messages: Array<string>
    resultCode: ResultCodes
}
