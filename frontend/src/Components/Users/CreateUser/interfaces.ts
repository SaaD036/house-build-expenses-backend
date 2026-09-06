export type CreateUserPagePropsType = {
    disabledForm?: boolean;
    createUser: (createUserFormData: CreateUserFormDataType) => Promise<void>;
};

export type CreateUserFormDataType = {
    firstName: string;
    lastName: string;
    email: string;
    role: string | null;
    accountStatus: string | null;
};
