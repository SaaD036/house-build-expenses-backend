export const isEmailValid = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;

    return emailRegex.test(email);
};
