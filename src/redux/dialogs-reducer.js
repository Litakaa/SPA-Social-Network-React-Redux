const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Viktoria'},
        {id: 2, name: 'Den'},
        {id: 3, name: 'Andrey'},
        {id: 4, name: 'Yulia'},
        {id: 5, name: 'Maik'}
    ],
    messages: [
        {id: 1, message: 'Hi, how are you?'},
        {id: 2, message: 'How is the weather today?'},
        {id: 3, message: 'How are you feeling?'},
        {id: 4, message: 'Hi'},
        {id: 5, message: 'Hi'},
    ]
};

const dialogsReducer = (state=initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}
export const sendMessageActionCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})


export default dialogsReducer;