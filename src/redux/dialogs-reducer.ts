import {InferActionsType} from "./redux-store";

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
type DialogActionsTypes = InferActionsType<typeof actions>

const dialogsReducer = (state=initialState, action: DialogActionsTypes) :InitialStateType => {
    switch (action.type) {
        case "dialogs/SEND_MESSAGE":
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}
export const actions = {
    sendMessage:(newMessageBody: string)  => ({type: "dialogs/SEND_MESSAGE", newMessageBody} as const )
}
export default dialogsReducer;