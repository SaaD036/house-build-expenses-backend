import Cookie from 'js-cookie';

export const cookieName = {
    USER_TOKEN: 'user_token',
};

export const setCookie = (name: string, value: string, expire = null) => {
    Cookie.set(name, value, expire ? { expires: expire } : undefined);
};

export const getCookie = (name: string) => {
    return Cookie.get(name);
};
