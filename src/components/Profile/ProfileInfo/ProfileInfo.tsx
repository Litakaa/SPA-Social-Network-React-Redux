import * as React from "react";
// @ts-ignore
import classes from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
// @ts-ignore
import userPhoto from "../../../assets/images/user.jpg";
import ProfileData from "./ProfileData";
import ProfileDataForm from "./ProfileDataForm";
import {ChangeEvent, useState} from "react";
import {ProfileType} from "../../../types/types";
import profile from "../Profile";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status:string)=>void
    isOwner: boolean
    savePhoto: (file:File) => void
    saveProfile: (profile:ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    }
    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then( () => {
            setEditMode(false);
        })
    }
    return (
        <div>
            <div className={classes.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={classes.mainPhoto}/>
                { isOwner && <input type={"file"} onChange={onMainPhotoSelected}/> }
                { editMode
                    ? <ProfileDataForm initialValues={profile} profile = {profile} onSubmit={onSubmit} />
                    : <ProfileData profile={profile}
                                   isOwner = {isOwner}
                                   gotoEditMode={ ()=> {setEditMode(true)}} />
                }
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    );
}


export default ProfileInfo;