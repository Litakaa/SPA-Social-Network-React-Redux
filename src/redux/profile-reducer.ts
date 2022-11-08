import {FormAction, stopSubmit} from "redux-form";
import { PhotosType, PostType, ProfileType} from "../types/types";
import { BaseThunkType, InferActionsType} from "./redux-store";
import {profileAPI} from "../API/profileAPI";

let initialState = {
    posts: [
        {id: 1, message: "It's first post", likeCount: 15},
        {id: 2, message: 'Hello', likeCount: 20},
        {id: 3, message: 'Hi', likeCount: 35},
        {id: 4, message: 'Hi', likeCount: 25}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ""
}
export type InitialStateType = typeof initialState
type ProfileActionsTypes = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ProfileActionsTypes | FormAction>

const profileReducer = (state=initialState, action: ProfileActionsTypes) : InitialStateType => {
    switch (action.type) {
        case "profile/ADD_POST":
        return {
            ...state,
            posts: [...state.posts, {id: 5, message: action.newPostText, likeCount: 0}]
        }
        case "profile/SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case "profile/SET_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "profile/DELETE_POSTS":
            return {
                ...state,
                posts: state.posts.filter(p=> p.id !== action.postId)

            }
        case "profile/SAVE_PHOTO":
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}
export const actions = {
    addPost:(newPostText: string) => ({type: "profile/ADD_POST",newPostText} as const),
    setUserProfile:(profile: ProfileType) => ({type: "profile/SET_USER_PROFILE", profile } as const),
    setStatus:(status: string) => ({type: "profile/SET_STATUS", status} as const),
    deletePost:(postId: number) => ({type: "profile/DELETE_POSTS", postId } as const),
    savePhotoSuccess:(photos: PhotosType) => ({type: "profile/SAVE_PHOTO", photos} as const)
}

export const getUsersProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.getUsersProfile(userId)
        dispatch(actions.setUserProfile(data));
    }
}
export const getStatus = (userId:number): ThunkType => {
     return async (dispatch) => {
        const data = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(data));
    }
}
export const updateStatus = (status: string):ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    }
}
export const savePhoto = (file: File):ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.savePhoto(file)
        if (data.resultCode ===0) {
            dispatch(actions.savePhotoSuccess(data.data.photos));
        }
    }
}
export const saveProfile = (profile: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const data = await profileAPI.saveProfile(profile)
        if (data.resultCode === 0) {
            if (userId != null){
                dispatch(getUsersProfile(userId))
            } else {
                throw new Error("userId cant to be null")
            }
        } else {
            dispatch(stopSubmit("editProfile", {_error: data.messages[0]}));
            return Promise.reject(data.messages[0]);
        }
    }
}
export default profileReducer;