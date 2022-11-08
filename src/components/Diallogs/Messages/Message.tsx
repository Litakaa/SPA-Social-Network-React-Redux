import * as  React from "react";
// @ts-ignore
import classes from './Message.module.css';

type PropsType = {
    message: string
}


const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.message}>
            {props.message}
        </div>
    );
}
export default Message;