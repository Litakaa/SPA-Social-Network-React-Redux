import * as  React from "react";
// @ts-ignore
import classes from "./ProfileDataForm.module.css"
import {CreateField, GetStringKeys, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "../../../types/types";


type PropsType={
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> =
    ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
             <div><button>Save</button></div>
            { error && <div className={classes.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <b>Full name</b> : { CreateField<ProfileTypeKeys>("Full Name", [], "fullName", Input)}
            </div>
            <div>
                <b>Looking for a job</b> :
                { CreateField<ProfileTypeKeys>("", [], "lookingForAJob", Input, {type: "checkbox"})}
            </div>
                <div>
                    <b>My professional skills</b> :
                    { CreateField<ProfileTypeKeys>("My professional skills", [], "lookingForAJobDescription", Textarea)}
                </div>
            <div>
                <b>About Me</b>: { CreateField<ProfileTypeKeys>("About Me", [], "aboutMe", Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key= {key} className={classes.contact}>
                    {/*todo: create some solution for embedded object*/}
                    <b>{key}:{ CreateField(key, [], "contacts." + key, Input)} </b>
                </div>
            })}
            </div>
        </form>
    );
}
const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({form: "editProfile"})(ProfileDataForm);


export default ProfileDataReduxForm;