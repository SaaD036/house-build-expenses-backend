export type LoginPagePropTypes = {
    login: (email: string, password: string) => Promise<void>;
};
