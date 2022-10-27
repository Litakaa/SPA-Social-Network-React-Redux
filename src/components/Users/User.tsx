import * as React from "react";
// @ts-ignore
import classes from "./Users.module.css";
// @ts-ignore
import userPhoto from "../../assets/images/user.jpg";
import {NavLink} from "react-router-dom";
import {UsersType} from "../../types/types";

type PropsType = {
    user: UsersType
    followingProgress: Array<number>
    unFollow: (userId: number)=> void
    follow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, followingProgress, unFollow, follow}) => {
    return (
        <div>
             <span>
                 <div>
                     <NavLink to={'/profile/' + user.id}>
                         <img className={classes.userPhoto}
                              src={user.photos.small != null ? user.photos.small : userPhoto}/>
                     </NavLink>
                 </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingProgress.some(id => id === user.id)}
                                      onClick={() => { unFollow(user.id)} }> UnFollow </button>
                            : <button disabled={followingProgress.some(id => id === user.id)}
                                      onClick={() => { follow(user.id)} }> Follow </button>
                        }
                        </div>
             </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </span>
            </span>
        </div>
    );
}
export default User;