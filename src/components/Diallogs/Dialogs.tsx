import * as React from "react";
// @ts-ignore
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Messages/Message";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import {InitialStateType} from "../../redux/dialogs-reducer";

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}
export type NewMessageFormType = {
    newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage;
    let dialogElement = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messageElement = state.messages.map(m => <Message key={m.id} message={m.message}/>);

    let addNewMessage = (values: NewMessageFormType) => {
        props.sendMessage(values.newMessageBody);
    }
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogElement}
            </div>
            <div className={classes.messages}>
                {messageElement}
            </div>
            <AddMessageForm onSubmit={addNewMessage}/>
        </div>
    );
}

export default Dialogs;