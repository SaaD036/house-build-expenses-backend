import React from 'react';
import { FormikHelpers } from 'formik';

export type FormProsType<initialValueTypes> = {
    children: React.ReactNode;
    initialValue: initialValueTypes;
    validationObject: object;
    onSubmit: (formValue: initialValueTypes, formikHelpers: FormikHelpers<object>) => void;
};
