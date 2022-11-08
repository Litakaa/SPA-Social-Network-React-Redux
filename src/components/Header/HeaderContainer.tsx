import * as React from "react";
import Header, {MapDispatchPropsType, MapStatePropsType} from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";


class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchPropsType> {

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}
export const mapStateToProps = (state: AppStateType) => {
    return {
        login: state.auth.login,
        userId: state.auth.userId,
        isAuth: state.auth.isAuth
    } as MapStatePropsType
}
export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
(mapStateToProps, {logout})(HeaderContainer);




