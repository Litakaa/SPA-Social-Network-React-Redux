const SEND_MESSAGE_SAITBAR = 'SEND_MESSAGE_SAITBAR';

let initialState = {
    saitBar: [
        {id: 1, name: "Andrey"},
        {id: 2, name: "Sveta"},
        {id: 3, name: "Yulia"}
    ],
}

const saitbarReducer = (state=initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE_SAITBAR:
            let message = action.newMessageSaitBar;
            return {
                ...state,
                saitBar: [...state.saitBar, {id: 4, name: message}]
            }
        default:
            return state;
    }
}
export const sendMessageSaitBarActionCreator = (newMessageSaitBar) => ({type: SEND_MESSAGE_SAITBAR, newMessageSaitBar});


export default saitbarReducer;