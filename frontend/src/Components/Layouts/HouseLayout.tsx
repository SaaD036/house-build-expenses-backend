import { connect } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import Layout from '.';
import ProtectedRoutes from '../../RoutesProtection';
import CustomNotFound from '../Custom/CustomNotFound';

import { fetchHouseDetails, clearHouseDetailsData } from '../../Redux/actions/houseAction';

import { SIDEBAR_ITEMS_LAYER } from './Sidebar/constants';
import { ReducerStateType } from '../../Redux/reducers';
import { HouseLayoutPropsType } from './interfaces';

const HouseLayout = ({ house, fetchHouseDetails, clearHouseDetailsData }: HouseLayoutPropsType) => {
    const { houseSlug } = useParams();

    const [houseLoading, setHouseLoading] = useState<'preload' | 'loading' | 'postload'>('preload');

    const loadHouseDetailsData = useCallback(async () => {
        setHouseLoading('loading');
        await fetchHouseDetails(houseSlug ?? '');
        setHouseLoading('postload');
    }, [houseSlug, setHouseLoading, fetchHouseDetails]);

    useEffect(() => {
        loadHouseDetailsData();
    }, [loadHouseDetailsData]);

    useEffect(() => {
        return () => {
            clearHouseDetailsData();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (houseLoading === 'postload' && !house) {
        return (
            <div className="center" style={{ height: '100vh' }}>
                <CustomNotFound title="House not found" />
            </div>
        );
    }

    return (
        <ProtectedRoutes auth>
            <Layout
                houseSlug={houseSlug}
                sidebarItemsLayer={SIDEBAR_ITEMS_LAYER.HOUSE}
                isLoadingChildren={houseLoading === 'preload' || houseLoading === 'loading'}
            >
                <Outlet />
            </Layout>
        </ProtectedRoutes>
    );
};

const mapStateToProps = (state: ReducerStateType) => ({
    house: state.house.house,
});

const mapDispatchToProps = {
    fetchHouseDetails,
    clearHouseDetailsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(HouseLayout);
