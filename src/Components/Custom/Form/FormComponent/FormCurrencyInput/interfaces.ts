import { FieldHookConfig } from 'formik';

export type FormCurrencyInputPropsType = {
    id: string;
    label: string;
    min?: number;
    max?: number;
} & FieldHookConfig<any>;
