import { FieldHookConfig } from 'formik';

export type FormNumberInputPropsType = {
    id: string;
    label: string;
    min?: number;
    max?: number;
} & FieldHookConfig<any>;
