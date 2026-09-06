import { FieldHookConfig } from 'formik';

export type FormSelectInputPropsType = {
    id: string;
    label: string;
    options: FormSelectItemType[];
} & FieldHookConfig<any>;

export type FormSelectItemType = {
    value: string;
    label: string;
};
