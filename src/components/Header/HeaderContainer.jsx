import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {

    render() {
        return (
            <Header {...this.props}/>
        )
    }
}
export const mapStateToProps = (state) => {
    return {
        login: state.auth.login,
        email: state.auth.email,
        userId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}
export default connect (mapStateToProps, {logout})(HeaderContainer);




