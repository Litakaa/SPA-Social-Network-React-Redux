import React from "react";
import classes from './Friends.module.css';


const Friends = (props) => {

    return (
        <div className={classes.item}>
                <img
                    src='https://res.cloudinary.com/lmru/image/upload/LMCode/81928265.jpg' alt="i1"/>
                <div className={classes.itemName}>
                    {props.name}
                </div>


        </div>

    );
}

export default Friends;