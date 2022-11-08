import * as React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {CreateField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
// @ts-ignore
import classes from "../common/FormsControls/FormsControls.module.css";
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
    = ({handleSubmit, error, captchaUrl}) =>
    {
    return (
        <form onSubmit={handleSubmit}>
            {CreateField<LoginFormValuesTypeKeys>("Email", [required], "email", Input)}
            {CreateField<LoginFormValuesTypeKeys>("Password", [required], "password", Input, {type: "password"})}
            {CreateField<LoginFormValuesTypeKeys>(undefined, [], "rememberMe", Input, {type: "checkbox"}, "remember Me")}

            { captchaUrl && <img src={captchaUrl}/> }
            { captchaUrl && CreateField<LoginFormValuesTypeKeys>("Symbols from image", [required], "captcha", Input)}

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
const LoginReduxForm = reduxForm<LoginFormValuesType,LoginFormOwnProps>({form: 'login'})(LoginForm);

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
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
const mapStateToProps = (state:AppStateType): MapStatePropsType => {
    return {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth,
    }
}
export default connect(mapStateToProps, {login})(Login);