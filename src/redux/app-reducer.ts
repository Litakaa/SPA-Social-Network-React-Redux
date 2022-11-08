import {authUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type InitialStateTypes = {
    initialized: boolean
}

let initialState: InitialStateTypes = {
    initialized: false
};

const appReducer = (state=initialState, action: any):InitialStateTypes => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
        return {
            ...state,
            initialized: true
        };
        default:
            return state;
    }
}
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const InitializedSuccess = () :InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS});
export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(authUserData());
        Promise.all([promise])
            .then(() => {
            dispatch(InitializedSuccess());
        })
}
export default appReducer;