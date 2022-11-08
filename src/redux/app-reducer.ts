import {authUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsType} from "./redux-store";

let initialState = {
    initialized: false
};
export type InitialStateTypes = typeof initialState
type ActionTypesApp = InferActionsType<typeof actions>
type ThunkType = BaseThunkType <ActionTypesApp>


const appReducer = (state=initialState, action: ActionTypesApp):InitialStateTypes => {
    switch (action.type) {
        case "app/INITIALIZED_SUCCESS":
        return {
            ...state,
            initialized: true
        };
        default:
            return state;
    }
}

export const actions = {
    InitializedSuccess: ()  => ({type: "app/INITIALIZED_SUCCESS"} as const)
}

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(authUserData());
        Promise.all([promise])
            .then(() => {
            dispatch(actions.InitializedSuccess());
        })
}
export default appReducer;