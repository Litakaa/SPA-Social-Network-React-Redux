import {profileAPI} from "../API/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POSTS = 'DELETE_POSTS';

let initialState = {
    posts: [
        {id: 1, message: "It's first post", likeCount: 15},
        {id: 2, message: 'Hello', likeCount: 20},
        {id: 3, message: 'Hi', likeCount: 35},
        {id: 4, message: 'Hi', likeCount: 25}
    ],
    profile: null,
    status: ""
};
const profileReducer = (state=initialState, action) => {
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
        default:
            return state;
    }
}
export const addPostActionCreator = (newPostText) => ({type: ADD_POST,newPostText});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (postId) => ({type: DELETE_POSTS, postId })
export const getUsersProfile = (userId) => (dispatch) => {
    profileAPI.getUsersProfile(userId).then(response => {
        dispatch(setUserProfile(response.data));
    });
}
export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatus(response.data));
    });
}
export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode ===0) {
            dispatch(setStatus(status));
        }
    });
}
export default profileReducer;