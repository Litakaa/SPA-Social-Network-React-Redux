import * as React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../types/types";

type PropsType = {
    currentPage: number,
    onPageChanged: (p: number) => void,
    pageSize: number,
    totalUsersCount: number,
    users: Array<UsersType>,
    followingProgress: Array<number>,
    unFollow: (userId: number) => void
    follow: (userId: number) => void
}
let Users: React.FC<PropsType> = ({
                                currentPage,
                                onPageChanged,
                                totalUsersCount,
                                pageSize,
                                users,
                                ...props
                            }) => {
    return (
        <div>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                       totalUsersCount={totalUsersCount} pageSize={pageSize}/>
            <div>
                {users.map(u => <User user={u}
                                      followingProgress={props.followingProgress}
                                      unFollow={props.unFollow}
                                      follow={props.follow}
                                      key={u.id}/>)}
            </div>
        </div>
    );
}
export default Users;