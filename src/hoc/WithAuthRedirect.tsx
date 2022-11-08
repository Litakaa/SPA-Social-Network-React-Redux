import * as React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
        isAuth: state.auth.isAuth
    } as mapPropsType)

type mapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {

}

function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<mapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Navigate to={"/login"}/>
        return <WrappedComponent {...restProps as WCP}/>
    }

    let ConnectedRedirectComponent = connect<mapPropsType, DispatchPropsType, WCP,AppStateType>
    (mapStateToPropsForRedirect, {})(RedirectComponent);

    return ConnectedRedirectComponent;
}
export default withAuthRedirect;