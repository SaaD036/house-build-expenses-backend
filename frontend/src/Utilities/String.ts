export const isEmailValid = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;

    return emailRegex.test(email);
};

export const replaceVariablesInString = (path: string, variables: any = {}): string => {
    let url = path;

    Object.keys(variables).forEach((key) => {
        url = url.replace(`{${key}}`, variables[key]);
    });

    return url;
};
