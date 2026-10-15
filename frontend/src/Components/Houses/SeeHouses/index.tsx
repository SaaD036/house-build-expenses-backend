import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';

import HouseTable from '../HouseTable';
import CardContainer from '../../CardContainer';
import CustomPagination from '../../Custom/CustomPagination';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import SwitchViewButtonSectionContainer from '../../CardContainer/SwitchViewButtonSectionContainer';

import { fetchHouseList } from '../../../Redux/actions/houseAction';

import { SeeHousePropsType } from '../interfaces';
import { ReducerStateType } from '../../../Redux/reducers';

import { Views } from '../../../Constants/General';
import { TABLE_ROW_COUNT_OPTIONS } from '../../Custom/CustomTable/constants';

const SeeHouses = (props: SeeHousePropsType) => {
    const { currentView, houseList, houseCount, houseTypes, fetchHouseList } = props;

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [housesPerPage, setHousesPerPage] = useState(TABLE_ROW_COUNT_OPTIONS[0]);

    const cardContainerTitle = useMemo(() => {
        if (houseTypes === 'your_created') {
            return 'Your Houses';
        }

        if (houseTypes === 'shared') {
            return 'Shared Houses';
        }

        if (houseTypes === 'requested') {
            return 'Unapproved Houses';
        }
    }, [houseTypes]);

    const loadHouseData = async (filters: any) => {
        setLoading(true);
        await fetchHouseList({ ...filters, page: currentPage, limit: housesPerPage });
        setLoading(false);
    };

    useEffect(() => {
        loadHouseData({ page: currentPage, limit: housesPerPage });
    }, [housesPerPage, currentPage]);

    return (
        <div style={{ display: 'grid', gap: '20px' }}>
            {loading && <TabComponentLoader />}
            <CardContainer title={cardContainerTitle} />
            <SwitchViewButtonSectionContainer title="Change View" />
            {currentView === Views.CARD ? (
                'Card view houses'
            ) : (
                <HouseTable houses={houseList ?? []} />
            )}
            <CustomPagination
                page={currentPage}
                setPage={setCurrentPage}
                pageCount={Math.ceil((houseCount ?? 0) / housesPerPage)}
                itemsPerPage={{
                    itemsPerPageCount: TABLE_ROW_COUNT_OPTIONS,
                    selectedItemsPerPage: housesPerPage,
                    setItemsPerPageCount: (sizePerPage) => setHousesPerPage(sizePerPage),
                }}
            />
        </div>
    );
};

const mapStateToProps = (state: ReducerStateType) => ({
    currentView: state.general.currentView,
    houseList: state.house.houseList,
    houseCount: state.house.houseCount,
});

const mapDispatchToProps = { fetchHouseList };

export default connect(mapStateToProps, mapDispatchToProps)(SeeHouses);
