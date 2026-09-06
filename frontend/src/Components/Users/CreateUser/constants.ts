import * as Yup from 'yup';

import { CreateUserFormDataType } from './interfaces';
import { UserRole, UserAccountStatus } from '../../../Constants/Users';

export const CREATE_USER_FORM_ROLE_DROPDOWN_ITEM = [
    { value: UserRole.ADMIN, label: 'Admin' },
    { value: UserRole.VISITOR, label: 'Visitor' },
    { value: UserRole.USER, label: 'User' },
];

export const CREATE_USER_FORM_ACCOUNT_STATUS_DROPDOWN_ITEM = [
    { value: UserAccountStatus.ACTIVE, label: 'Active' },
    { value: UserAccountStatus.DEACTIVE, label: 'Deactive' },
    { value: UserAccountStatus.DELETED, label: 'Deleted' },
    { value: UserAccountStatus.WAITING_FOR_USER_APPROVAL, label: 'Waiting for user approval' },
];

export const CREATE_USER_FORM_INITIAL_VALUE: CreateUserFormDataType = {
    firstName: '',
    lastName: '',
    email: '',
    role: null,
    accountStatus: null,
};

export const CREATE_USER_FORM_VALIDATOR = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email('Email must be valid'),
    role: Yup.string().required('Role is required'),
    accountStatus: Yup.string().required('Account status is required'),
});
