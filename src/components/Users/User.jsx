import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/images/user.jpg";
import {NavLink} from "react-router-dom";


const User = ({user, followingProgress, unFollow, follow}) => {
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