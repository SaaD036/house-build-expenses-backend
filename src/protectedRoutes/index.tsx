import React from 'react';
import { Navigate } from 'react-router-dom';

import { getUserFromToken } from '../Utilities/Users/UserToken';

import { ProtectedRoutePropType } from './interfaces';

const ProtectedRoutes = (props: ProtectedRoutePropType) => {
    const { children, auth, role, redirectIfNotLoggedIn, redirectIfNotAuthenticated, redirect } =
        props;
    const user = getUserFromToken();

    if (auth) {
        const isRoleAuthenticated = (role || []).includes(user?.role || '');

        if (!user) {
            return <Navigate to={redirectIfNotLoggedIn || '/auth/login'} replace />;
        }

        if (role && !isRoleAuthenticated) {
            return <Navigate to={redirectIfNotAuthenticated || '/'} replace />;
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
