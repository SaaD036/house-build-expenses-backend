import { jwtDecode } from 'jwt-decode';
import { get } from 'lodash';

import { cookieName, getCookie } from '../Cookies';

import { LoggedinUserType } from '../../Types/Users';

export const getUserFromToken = (): LoggedinUserType | null => {
    const userToken = getCookie(cookieName.USER_TOKEN);
    const CURRENT_DATE = new Date();
    const CURRENT_TIME_IN_SECOND = CURRENT_DATE.getTime() / 1000;

    if (!userToken) {
        return null;
    }

    const user = jwtDecode(userToken) as any;

    if (CURRENT_TIME_IN_SECOND > get(user, 'exp', 0)) {
        return null;
    }

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    };
};
