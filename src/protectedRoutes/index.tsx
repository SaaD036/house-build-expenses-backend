import React from 'react';
import { Navigate } from 'react-router-dom';

import { getUserFromToken } from '../Utilities/Users/UserToken';

import { ProtectedRoutePropType } from './interfaces';

const ProtectedRoutes = (props: ProtectedRoutePropType) => {
    const { children, auth, redirectIfNotLoggedIn, redirect } = props;
    const user = getUserFromToken();

    if (auth) {
        if (!user) {
            return <Navigate to={redirectIfNotLoggedIn || '/auth/login'} replace />;
        }

        return children;
    } else {
        if (user) {
            return <Navigate to={redirect || '/'} replace />;
        }

        return children;
    }
};

export default ProtectedRoutes;
