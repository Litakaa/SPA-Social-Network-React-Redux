import * as React from "react";
import {useEffect, useState} from "react";

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (e) => {
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