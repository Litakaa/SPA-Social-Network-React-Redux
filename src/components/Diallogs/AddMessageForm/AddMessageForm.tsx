import * as React from "react";
import {maxLengthCreator, required} from "./../../../utils/validators/validators";
import {InjectedFormProps, reduxForm} from "redux-form";
import {CreateField, Textarea} from "../../common/FormsControls/FormsControls";
import {NewMessageFormType} from "../Dialogs";

const maxLength30 = maxLengthCreator(30);
type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormType, string>
type PropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> =
    (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {CreateField<NewMessageFormValuesKeysType>("Enter your message", [required, maxLength30], "newMessageBody", Textarea)}
            </div>
            <div>
                <button> Send Message</button>
            </div>
        </form>
    );
}
export default reduxForm<NewMessageFormType>({form: "dialogAddMessageForm"})(AddMessageForm);