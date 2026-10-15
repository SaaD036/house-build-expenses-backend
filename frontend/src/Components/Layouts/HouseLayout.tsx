import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

import Layout from '.';
import ProtectedRoutes from '../../RoutesProtection';

import { SIDEBAR_ITEMS_LAYER } from './Sidebar/constants';

const HouseLayout = () => {
    const { houseSlug } = useParams();

    return (
        <ProtectedRoutes auth>
            <Layout houseSlug={houseSlug} sidebarItemsLayer={SIDEBAR_ITEMS_LAYER.HOUSE}>
                <Outlet />
            </Layout>
        </ProtectedRoutes>
    );
};

export default HouseLayout;
