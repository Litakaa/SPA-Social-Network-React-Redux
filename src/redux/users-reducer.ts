import {updateObjectInArray} from "../utils/object-helpers";
import { UsersType} from "../types/types";
import {AppStateType, BaseThunkType, InferActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {userAPI} from "../API/userAPI";

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingProgress: [] as Array<number> // array of users id
};
export type InitialState = typeof initialState
const usersReducer = (state = initialState, action: ActionsTypes) : InitialState => {
    switch (action.type) {
        case "FOLLOW":
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
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false})
            };
        case "SET_USERS":
            return {
                ...state,
                users: action.users
            };
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            };
        case "SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalCount
            }
        case "TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
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
type ActionsTypes = InferActionsType<typeof actions>
export const actions = {
    followSuccess:(userID: number)=> ({type: "FOLLOW", userID} as const),
    unFollowSuccess: (userID: number)=> ({type: "UNFOLLOW", userID} as const),
    setUsers:(users: Array<UsersType>)=> ({type: "SET_USERS", users} as const),
    setCurrentPage:(currentPage: number)=> ({type: "SET_CURRENT_PAGE", currentPage} as const),
    setTotalUsersCount:(totalCount: number)=> ({type: "SET_TOTAL_USERS_COUNT", totalCount} as const),
    setToggleIsFetching:(isFetching: boolean)=> ({type: "TOGGLE_IS_FETCHING", isFetching} as const),
    toggleFollowingProgress:(isFetching:boolean, userID:number)=> ({type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFetching, userID} as const)
}

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>
export const requestUsers = (currentPage: number, pageSize: number) : ThunkType => {
    return async (dispatch, getState) =>
    {
        dispatch(actions.setToggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        let data = await userAPI.getUsers(currentPage, pageSize)
        dispatch(actions.setToggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}
const _followUnfollowFlow = async (dispatch:DispatchType,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionsTypes ) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, userAPI.followUsers.bind(userAPI), actions.followSuccess);
        }
}
export const unFollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch,userId,userAPI.unFollowUsers.bind(userAPI),actions.unFollowSuccess);
    }
}
export default usersReducer;