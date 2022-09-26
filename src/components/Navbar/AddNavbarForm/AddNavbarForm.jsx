import React from "react";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength20 = maxLengthCreator(20);

const AddNavbarForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name="newMessageSaitBar"
                       validate={[required, maxLength20]}
                       placeholder="Name your friends"/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
}
export default reduxForm({form: "navbarAddNavbarForm"})(AddNavbarForm);