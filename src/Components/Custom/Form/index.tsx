import React from 'react';
import { Formik, FormikHelpers } from 'formik';

import { FormProsType } from './interface';

const Form = (props: FormProsType) => {
    const { children, validationObject, initialValue } = props;

    return (
        <Formik
            initialValues={initialValue}
            validationSchema={validationObject}
            onSubmit={(values: object, formikHelpers: FormikHelpers<object>) => {}}
        >
            {(formik) => <form onSubmit={formik.handleSubmit}>{children}</form>}
        </Formik>
    );
};

export default Form;
