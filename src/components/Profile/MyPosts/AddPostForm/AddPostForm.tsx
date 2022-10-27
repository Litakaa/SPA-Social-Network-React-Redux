import * as React from "react";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {InjectedFormProps, reduxForm} from "redux-form";
import {CreateField, GetStringKeys, Textarea} from "../../../common/FormsControls/FormsControls";
import {NewPostFormType} from "../MyPosts";
import {NewMessageFormType} from "../../../Diallogs/Dialogs";


const maxLength10 = maxLengthCreator(10);
type NewPostFormValuesKeysType = GetStringKeys<NewPostFormType>
type PropsType = {}

const AddPostForm: React.FC<InjectedFormProps<NewPostFormType, PropsType> & PropsType> =
    (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {CreateField<NewPostFormValuesKeysType>("Post message", [required, maxLength10], "newPostText", Textarea)}
            </div>
            <div>
                <button> Add post</button>
            </div>
        </form>
    );
}
export default reduxForm<NewPostFormType>({form: "profileAddPostForm"})(AddPostForm);