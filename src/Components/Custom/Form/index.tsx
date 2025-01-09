import React from 'react';
import { Formik, FormikHelpers } from 'formik';

import { FormProsType } from './interface';

const Form = <T,>(props: FormProsType<T>) => {
    const { children, validationObject, initialValue, onSubmit } = props;

    return (
        <Formik
            initialValues={initialValue as object}
            validationSchema={validationObject}
            onSubmit={(values: object, formikHelpers: FormikHelpers<object>) =>
                onSubmit(values as T)
            }
        >
            {(formik) => <form onSubmit={formik.handleSubmit}>{children}</form>}
        </Formik>
    );
};

export default Form;
