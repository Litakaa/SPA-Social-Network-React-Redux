import * as React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ComponentType} from "react";
import {actions} from "../../redux/dialogs-reducer";


const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
export default compose<ComponentType>(
    connect(mapStateToProps,{sendMessage: actions.sendMessage}),
    withAuthRedirect
)(Dialogs);