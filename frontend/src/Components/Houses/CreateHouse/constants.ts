import * as Yup from 'yup';

export const CREATE_HOUSE_FORM_VALIDATOR = Yup.object().shape({
    title: Yup.string().trim().required('Title is required'),
    floors: Yup.number()
        .typeError('Floors must be a number')
        .min(1, 'Floors must be 1 or greater')
        .required('Floors is required'),
    description: Yup.string().optional(),
    addressLine: Yup.string().trim().required('Address line is required'),
    area: Yup.string().trim().required('Area is required'),
    upazilla: Yup.string().trim().required('Upazilla is required'),
    district: Yup.string().trim().required('District is required'),
});

export interface CreateHouseFormValues {
    title: string;
    floors: number;
    description?: string;
    addressLine: string;
    area: string;
    upazilla: string;
    district: string;
}

export const INITIAL_CREATE_HOUSE_VALUES: CreateHouseFormValues = {
    title: '',
    floors: 1,
    description: '',
    addressLine: '',
    area: '',
    upazilla: '',
    district: '',
};
