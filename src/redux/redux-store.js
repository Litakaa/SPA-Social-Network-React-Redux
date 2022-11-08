import {combineReducers} from "redux";
import { createStore, applyMiddleware } from 'redux';
import profileReducer from "./profile-reducer.ts";
import dialogsReducer from "./dialogs-reducer.ts";
import usersReducer from "./users-reducer.ts";
import authReducer from "./auth-reducer.ts";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form';
import appReducer from "./app-reducer";
import sideBarReducer from "./sideBar-reducer.ts";

let reducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sideBar: sideBarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;