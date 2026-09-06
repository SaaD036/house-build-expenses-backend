import { FieldHookConfig } from 'formik';

export type FormDateInputPropsType = {
    id: string;
    label: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
} & FieldHookConfig<any>;
