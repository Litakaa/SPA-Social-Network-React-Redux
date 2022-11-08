import {profileAPI} from "../API/api";
import {stopSubmit} from "redux-form";
import {ContactsType, PhotosType, PostType} from "../types/types";


const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POSTS = 'DELETE_POSTS';
const SAVE_PHOTO = 'SAVE_PHOTO';


type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

let initialState = {
    posts: [
        {id: 1, message: "It's first post", likeCount: 15},
        {id: 2, message: 'Hello', likeCount: 20},
        {id: 3, message: 'Hi', likeCount: 35},
        {id: 4, message: 'Hi', likeCount: 25}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
}
export type InitialStateType = typeof initialState

const profileReducer = (state=initialState, action: any) : InitialStateType => {
    switch (action.type) {
        case ADD_POST:
        return {
            ...state,
            posts: [...state.posts, {id: 5, message: action.newPostText, likeCount: 0}]
        }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POSTS:
            return {
                ...state,
                posts: state.posts.filter(p=> p.id !== action.postId)

            }
        case SAVE_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({type: ADD_POST,newPostText});
type setUserProfileActionCreatorType = {
    type:  typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): setUserProfileActionCreatorType => ({type: SET_USER_PROFILE, profile });
type setStatusActionCreatorType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): setStatusActionCreatorType => ({type: SET_STATUS, status});
type DeletePostActionCreatorType = {
    type:  typeof DELETE_POSTS
    postId: number
}
export const deletePost = (postId: number): DeletePostActionCreatorType => ({type: DELETE_POSTS, postId });
type savePhotoSuccessActionCreatorType = {
    type:  typeof SAVE_PHOTO
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessActionCreatorType => ({type: SAVE_PHOTO, photos})

export const getUsersProfile = (userId:ProfileType) => async (dispatch:any) => {
    const response = await profileAPI.getUsersProfile(userId)
        dispatch(setUserProfile(response.data));
}
export const getStatus = (userId:ProfileType) => async (dispatch:any) => {
    const response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data));
}
export const updateStatus = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode ===0) {
            dispatch(setStatus(status));
        }
}
export const savePhoto = (file: PhotosType) => async (dispatch:any) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode ===0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode ===0) {
        dispatch(getUsersProfile(userId));
    } else {
        dispatch(stopSubmit("editProfile",{_error: response.data.messages[0]}));
       return Promise.reject(response.data.messages[0]);
    }
}
export default profileReducer;