import { CreateUpdateActionMethodReturnType } from '../../../Types';

export type ForgetPasswordPagePropsType = {
    forgetPassword: (email: string) => Promise<CreateUpdateActionMethodReturnType>;
};

export type ResetPasswordPagePropsType = {
    email: string;
    makeSentEmailFlagFalse: () => void;
    resetPassword: (
        email: string,
        verificationCode: string,
        password: string
    ) => Promise<CreateUpdateActionMethodReturnType>;
};
