import React from "react";
import {sendMessageSaitBarActionCreator} from "../../redux/saitbar-reducer";
import Navbar from "./Navbar";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        saitBarPage: state.saitBarPage
    }
}
const mapToDispatchToProps = (dispatch) => {
    return {
        sendMessageSaitBar: (newMessageSaitBar) => {
            dispatch(sendMessageSaitBarActionCreator(newMessageSaitBar));
        }
    }
}
const NavbarContainer = connect(mapStateToProps, mapToDispatchToProps)(Navbar);

export default NavbarContainer;