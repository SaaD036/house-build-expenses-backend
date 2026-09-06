import { FieldHookConfig } from 'formik';

export type FormTextInputPropsType = {
    id: string;
    label: string;
} & FieldHookConfig<any>;
