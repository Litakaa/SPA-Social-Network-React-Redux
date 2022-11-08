import {userAPI} from "../API/api";
import {updateObjectInArray} from "../utils/object-helpers";
import { UsersType} from "../types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingProgress: [] as Array<number> // array of users id
};
export type InitialState = typeof initialState
const usersReducer = (state = initialState, action: any) : InitialState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: true})
                /*users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })*/
            };

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false})
            };

        case SET_USERS:
            return {
                ...state,
                users: action.users
            };

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingProgress: action.isFetching
                    ? [...state.followingProgress, action.userID]
                    : state.followingProgress.filter(id => id !== action.userID)
            }

        default:
            return state;
    }
}
type FollowSuccessActionCreatorType = {
    type: typeof FOLLOW
    userID: number
}
export const followSuccess = (userID: number): FollowSuccessActionCreatorType => ({type: FOLLOW, userID});
type UnFollowSuccessActionCreatorType = {
    type: typeof UNFOLLOW
    userID: number
}
export const unFollowSuccess = (userID: number):UnFollowSuccessActionCreatorType => ({type: UNFOLLOW, userID});
type SetUsersActionCreatorType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>):SetUsersActionCreatorType => ({type: SET_USERS, users});
type SetCurrentPageActionCreatorType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number):SetCurrentPageActionCreatorType => ({type: SET_CURRENT_PAGE, currentPage});
type SetTotalUsersCountActionCreatorType = {
    type:  typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionCreatorType => ({type: SET_TOTAL_USERS_COUNT, totalCount});
type SetToggleIsFetchingActionCreatorType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const setToggleIsFetching = (isFetching: boolean):SetToggleIsFetchingActionCreatorType => ({type: TOGGLE_IS_FETCHING, isFetching});
type ToggleFollowingProgressActionCreatorType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userID: number
}
export const toggleFollowingProgress = (isFetching:boolean, userID:number):ToggleFollowingProgressActionCreatorType =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID});

 export const requestUsers = (currentPage: number, pageSize:number) => async (dispatch:any) => {
     dispatch(setToggleIsFetching(true));
     dispatch(setCurrentPage(currentPage));
    let data = await userAPI.getUsers(currentPage, pageSize)
        dispatch(setToggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
}
const followUnfollowFlow = async (dispatch:any, userId: number, apiMethod: any, actionCreator:any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number) => async (dispatch:any) => {
    followUnfollowFlow(dispatch, userId, userAPI.followUsers.bind(userAPI), followSuccess);
}
export const unFollow = (userId: number) => async (dispatch:any) => {
    followUnfollowFlow(dispatch,userId,userAPI.unFollowUsers.bind(userAPI),unFollowSuccess);

}
export default usersReducer;