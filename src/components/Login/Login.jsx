import React from "react";
import {reduxForm} from "redux-form";
import {CreateField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import classes from "../common/FormsControls/FormsControls.module.css";

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {CreateField("Email", [required], "email", Input)}
            {/*<Field placeholder={"Email"}
                       validate={[required]}
                       name={"email"}
                       component={Input}/>*/}
            {CreateField("Password", [required], "password", Input, {type: "password"})}
            {CreateField(null, [], "rememberMe", Input, {type: "checkbox"}, "remember Me")}

            { captchaUrl && <img src={captchaUrl}/> }
            { captchaUrl && CreateField("Symbols from image", [required], "captcha", Input)}

            { error && <div className={classes.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) return <Navigate to={"/profile"}/>
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl = {props.captchaUrl} />
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth,
    }
}
export default connect(mapStateToProps, {login})(Login);