import React from 'react';
import { Outlet, useMatches } from 'react-router-dom';

import Layout from '.';
import ProtectedRoutes from '../../RoutesProtection';

import { SIDEBAR_ITEMS_LAYER } from './Sidebar/constants';

const HomeLayout = () => {
    const matches = useMatches();
    const currentMatch = matches.find((match: any) => match.handle?.role);
    const role = (currentMatch?.handle as any)?.role;

    return (
        <ProtectedRoutes auth role={role}>
            <Layout sidebarItemsLayer={SIDEBAR_ITEMS_LAYER.HOME}>
                <Outlet />
            </Layout>
        </ProtectedRoutes>
    );
};

export default HomeLayout;
