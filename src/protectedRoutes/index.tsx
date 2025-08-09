import React from 'react';
import { Navigate } from 'react-router-dom';

import { cookieName, getCookie } from '../Utilities/Cookies';

import { ProtectedRoutePropType } from './interfaces';

const ProtectedRoutes = (props: ProtectedRoutePropType) => {
    const { children, auth, redirectIfNotLoggedIn, redirect } = props;
    const userToken = getCookie(cookieName.USER_TOKEN);

    if (auth) {
        if (!userToken) {
            return <Navigate to={redirectIfNotLoggedIn || '/auth/login'} replace />;
        }

        return children;
    } else {
        if (userToken) {
            return <Navigate to={redirect || '/'} replace />;
        }

        return children;
    }
};

export default ProtectedRoutes;
