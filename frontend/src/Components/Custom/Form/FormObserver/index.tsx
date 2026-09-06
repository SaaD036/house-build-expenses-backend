import { useFormikContext } from 'formik';
import { useEffect } from 'react';

import { FormObserverPropsType } from '../interface';

const FormObserver = <T,>(props: FormObserverPropsType<T>) => {
    const { onFormValueChange } = props;
    const { values } = useFormikContext<T>();

    useEffect(() => {
        if (onFormValueChange) {
            onFormValueChange(values);
        }
    }, [values]);

    return null;
};

export default FormObserver;
