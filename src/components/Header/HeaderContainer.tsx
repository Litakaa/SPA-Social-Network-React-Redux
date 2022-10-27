import * as React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";


type MapStatePropsType= {
    login: string
    email: string
    userId: number
    isAuth: boolean
}
type MapDispatchPropsType = {
    logout: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<PropsType> {

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}
export const mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        login: state.auth.login,
        email: state.auth.email,
        userId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}
export default connect<MapStatePropsType, MapDispatchPropsType, AppStateType>
(mapStateToProps, {logout})(HeaderContainer);




