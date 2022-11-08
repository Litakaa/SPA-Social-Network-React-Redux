import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
    status: string
    updateStatus: (status: string) =>void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    return (
        <div>
            {! editMode &&
                <div>
                    <b>Status:</b> <span onDoubleClick={activateEditMode}>{props.status || "No status"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange}
                           onBlur={deactivateEditMode}
                           autoFocus={true}
                            value={status}>
                    </input>
                </div>
            }
        </div>

    );
}

export default ProfileStatusWithHooks;