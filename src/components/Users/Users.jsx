import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {
    return (
        <div>
            <Paginator currentPage = {currentPage} onPageChanged = {onPageChanged}
                       totalUsersCount = {totalUsersCount} pageSize = {pageSize}/>
            {/*<div>
                {slicedPages.map(p => {
                    return <span className={props.currentPage === p && classes.selectedPage}
                                 onClick={(e) => {
                                     props.onPageChanged(p);
                                 }}>{p}</span>
                })}
            </div>*/}
            <div>
                { users.map(u => <User user={u} followingProgress={props.followingProgress}
                                       unFollow={props.unFollow} follow={props.follow} key={u.id}/>) }
            </div>
        </div>
    );
}
export default Users;