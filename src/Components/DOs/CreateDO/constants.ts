import * as Yup from 'yup';

import { CreateDOformValueType } from './interfaces';

export const CREATE_DO_INITIAL_VALUE: CreateDOformValueType = {
    shopname: '',
    doItem: '',
    amount: null,
    area: '',
    ward: '',
    upazilla: '',
    district: 'Jamalpur',
    description: '',
    doDate: new Date(),
};

export const CREATE_DO_FORM_VALIDATION = Yup.object({
    shopname: Yup.string().required('Shop Name is required'),
    doItem: Yup.string().required('DO item name is required'),
    description: Yup.string().required('Description is required'),
    amount: Yup.number().min(1, 'Amount must be positive number').required('Amount is required'),
    area: Yup.string().required('Area is required'),
    ward: Yup.string().required('Ward is required'),
    upazilla: Yup.string().required('Upazilla is required'),
    district: Yup.string().required('District is required'),
    doDate: Yup.date()
        .max(new Date(), 'DO added date cann not be future date')
        .required('DO added date is required'),
});
