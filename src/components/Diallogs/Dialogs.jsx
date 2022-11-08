import React from "react";
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Messages/Message";
import {Navigate} from "react-router-dom";
import AddMessageForm from "./AddMessageForm/AddMessageForm";


const Dialogs = (props) => {

    let state = props.dialogsPage;
    let dialogElement = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messageElement = state.messages.map(m => <Message key={m.id} message={m.message}/>);

    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody);
    }

    if (!props.isAuth) return <Navigate to={"/login"}/>;

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