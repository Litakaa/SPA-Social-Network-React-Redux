import React from "react";
import classes from "./FormsControls.module.css";
import {Field} from "redux-form";

const  FormControl = ({input, meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div>
        <div className={classes.formControl + "" + (hasError ? classes.error : "")}>
            {children}
        </div>
            { hasError && <span>{error}</span> }
        </div>
    );
}
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps}></textarea></FormControl>
}
export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <input {...input} {...restProps}></input></FormControl>
}

export const CreateField = (placeholder, validators, name, component, props ={}, text="") => {
    return <div>
        <Field placeholder={placeholder}
               validate={validators}
               name={name}
               component={component}
               {...props}/> {text}
    </div>
}