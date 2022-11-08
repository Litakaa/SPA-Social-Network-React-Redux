import {Action, combineReducers} from "redux";
import { createStore, applyMiddleware } from 'redux';
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";
import sideBarReducer from "./sideBar-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sideBar: sideBarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>


export type InferActionsType <T> = T extends {[key: string]: (...args: any[])=>infer U } ? U : never

export type BaseThunkType<A extends Action,R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;