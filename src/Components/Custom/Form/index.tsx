import React from 'react';
import { Formik, FormikHelpers } from 'formik';

import FormObserver from './FormObserver';

import { FormPropsType } from './interface';
import styles from './styles.module.css';

const Form = <T,>(props: FormPropsType<T>) => {
    const { children, validationObject, initialValue, onFormValueChange, onSubmit } = props;

    return (
        <Formik
            initialValues={initialValue as object}
            validationSchema={validationObject}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values: object, formikHelpers: FormikHelpers<object>) =>
                onSubmit(values as T, formikHelpers)
            }
        >
            {(formik) => (
                <form onSubmit={formik.handleSubmit} className={styles.formWrapper}>
                    <FormObserver onFormValueChange={onFormValueChange} />
                    {children}
                </form>
            )}
        </Formik>
    );
};

export default Form;
