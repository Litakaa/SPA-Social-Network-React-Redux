import React from "react";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength30 = maxLengthCreator(30);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name="newMessageBody"
                       validate={[required, maxLength30]}
                       placeholder="Enter your message"/>
            </div>
            <div>
                <button> Send Message</button>
            </div>
        </form>
    );
}
export default reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);