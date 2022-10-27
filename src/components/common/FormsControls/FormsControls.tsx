import * as React from "react"
// @ts-ignore
import classes from "./FormsControls.module.css"
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"
import {FieldValidatorType} from "../../../utils/validators/validators"

type FormControlsPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

const  FormControl: React.FC<FormControlsPropsType> = ({ meta: {touched, error}, children}) => {
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


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    /*const {input, meta, child, ...restProps} = props;*/
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps}></textarea></FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
   /* const {input, meta, child, ...restProps} = props;*/
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}> <input {...input} {...restProps}></input></FormControl>
}

export function CreateField<FormKeysType extends string>(placeholder: string,
                            validators: Array<FieldValidatorType>,
                            name: FormKeysType,
                            component: React.FC<WrappedFieldProps>,
                            props ={},
                            text="") {
    return <div>
        <Field placeholder={placeholder}
               validate={validators}
               name={name}
               component={component}
               {...props}/> {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>