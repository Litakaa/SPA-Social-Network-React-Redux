const SEND_MESSAGE = 'SEND_MESSAGE';

type DialogType = {
    id: number
    name: string
}
type MessagesType = {
    id: number
    message: string
}
let initialState = {
    dialogs: [
        {id: 1, name: 'Viktoria'},
        {id: 2, name: 'Den'},
        {id: 3, name: 'Andrey'},
        {id: 4, name: 'Yulia'},
        {id: 5, name: 'Maik'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi, how are you?'},
        {id: 2, message: 'How is the weather today?'},
        {id: 3, message: 'How are you feeling?'},
        {id: 4, message: 'Hi'},
        {id: 5, message: 'Hi'},
    ] as Array<MessagesType>
};
export type InitialStateType = typeof initialState

const dialogsReducer = (state=initialState, action: any) :InitialStateType => {
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
type SendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageActionCreator = (newMessageBody: string):SendMessageActionCreatorType  => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;