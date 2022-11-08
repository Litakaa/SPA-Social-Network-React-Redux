import React from "react";
import classes from "./ProfileDataForm.module.css"
import {CreateField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";


const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
             <div><button>Save</button></div>
            { error && <div className={classes.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <b>Full name</b> : { CreateField("Full Name", [], "fullName", Input)}
            </div>
            <div>
                <b>Looking for a job</b> :
                { CreateField("", [], "lookingForAJob", Input, {type: "checkbox"})}
            </div>
                <div>
                    <b>My professional skills</b> :
                    { CreateField("My professional skills", [], "lookingForAJobDescription", Textarea)}
                </div>
            <div>
                <b>About Me</b>: { CreateField("About Me", [], "aboutMe", Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key= {key} className={classes.contact}>
                    <b>{key}:{ CreateField(key, [], "contacts." + key, Input)} </b>
                </div>
            })}
            </div>
        </form>
    );
}
const ProfileDataReduxForm = reduxForm({form: "editProfile"})(ProfileDataForm);


export default ProfileDataReduxForm;