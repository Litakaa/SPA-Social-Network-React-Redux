import React from "react";
import classes from './../Navbar/Navbar.module.css';
import {NavLink} from "react-router-dom";
import Friends from "./Saitbar/Friends";
import AddNavbarForm from "./AddNavbarForm/AddNavbarForm";

const Navbar = (props) => {
    let state = props.saitBarPage;
    let friendsElement = state.saitBar.map(f => <Friends name = {f.name} key = {f.id} id = {f.id}/>)
    let addSendMessageSaitBar = (values) => {
        props.sendMessageSaitBar(values.newMessageSaitBar);
    }
    return (
        <nav className={classes.nav}>
            <div>
                <NavLink to="/profile"
                         className={navData => navData.isActive ? classes.active : classes.item}>Profile</NavLink>
            </div>
            <div>
                <NavLink to="/dialogs"
                         className={navData => navData.isActive ? classes.active : classes.item}>Messages</NavLink>
            </div>
            <div>
            <NavLink to="/users"
                     className={navData => navData.isActive ? classes.active : classes.item}>Users</NavLink>
        </div>
            <div>
                <NavLink to="/news"
                         className={navData => navData.isActive ? classes.active : classes.item}>News</NavLink>
            </div>
            <div>
                <NavLink to="/music"
                         className={navData => navData.isActive ? classes.active : classes.item}>Music</NavLink>
            </div>
            <div>
                <NavLink to="/settings"
                         className={navData => navData.isActive ? classes.active : classes.item}>Settings</NavLink>
            </div>
            <div>
                <NavLink to="/profile"
                         className={navData => navData.isActive ? classes.active : classes.item}> Friends</NavLink>
            </div>
            <div>{friendsElement}</div>
            <AddNavbarForm onSubmit={addSendMessageSaitBar}/>
        </nav>
    );
}
export default Navbar;