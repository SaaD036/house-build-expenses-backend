import React from 'react';
import { Formik, FormikHelpers } from 'formik';

import { FormProsType } from './interface';
import styles from './styles.module.css';

const Form = <T,>(props: FormProsType<T>) => {
    const { children, validationObject, initialValue, onSubmit } = props;

    return (
        <Formik
            initialValues={initialValue as object}
            validationSchema={validationObject}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values: object, formikHelpers: FormikHelpers<object>) =>
                onSubmit(values as T)
            }
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>
                    {children}
                </form>
            )}
        </Formik>
    );
};

export default Form;
