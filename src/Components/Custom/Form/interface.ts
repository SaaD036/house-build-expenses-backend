import React from 'react';

export type FormProsType<initialValueTypes> = {
    children: React.ReactNode;
    initialValue: initialValueTypes;
    validationObject: object;
    onSubmit: (formValue: initialValueTypes) => void;
};
