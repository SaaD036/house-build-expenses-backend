import React from 'react';

export type ProtectedRoutePropType = {
    children: React.ReactElement;
    redirect?: string;
    redirectIfNotLoggedIn?: string;
    redirectIfNotAuthenticated?: string;
    auth?: true;
    role?: string[];
};
