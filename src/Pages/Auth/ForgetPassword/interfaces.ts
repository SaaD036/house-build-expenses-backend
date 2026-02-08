export type ForgetPasswordPagePropsType = {
    forgetPassword: (email: string) => Promise<'success' | 'fail'>;
};

export type ResetPasswordPagePropsType = {
    makeSentEmailFlagFalse: () => void;
};
