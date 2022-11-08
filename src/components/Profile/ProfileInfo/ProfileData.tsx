import * as React from "react";
// @ts-ignore
import classes from './ProfileInfo.module.css';
import {ContactsType, ProfileType} from "../../../types/types";


type PropsType = {
    profile: ProfileType
    isOwner: boolean
    gotoEditMode: () => void
}
const ProfileData: React.FC<PropsType> = ({profile, isOwner, gotoEditMode}) => {
    return (
        <div>
            {isOwner && <div><button onClick={gotoEditMode}>Edit</button></div>}
            <div>
                <b>Full name</b>: {profile.fullName}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
            </div>
            { profile.lookingForAJob &&
                <div>
                    <b>My professional skills</b>: {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>AboutMe</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Contacts</b>: {Object
                .keys(profile.contacts)
                .map((key) => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
            })}
            </div>
        </div>
    );
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div className={classes.contact}><b>{contactTitle}</b> : {contactValue}</div>
    );
}

export default ProfileData;


