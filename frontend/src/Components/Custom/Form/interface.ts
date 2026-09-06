import React from 'react';
import { FormikHelpers } from 'formik';

export type FormPropsType<initialValueTypes> = {
    children: React.ReactNode;
    initialValue: initialValueTypes;
    validationObject: object;
    onFormValueChange?: (formValue: initialValueTypes) => void;
    onSubmit?: (formValue: initialValueTypes, formikHelpers: FormikHelpers<object>) => void;
};

export type FormObserverPropsType<initialValueTypes> = {
    onFormValueChange?: (formValue: initialValueTypes) => void;
};
