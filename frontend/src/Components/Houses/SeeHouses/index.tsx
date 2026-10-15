import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';

import CardContainer from '../../CardContainer';
import CustomPagination from '../../Custom/CustomPagination';
import SwitchViewButtonSectionContainer from '../../CardContainer/SwitchViewButtonSectionContainer';

import { SeeHousePropsType } from '../interfaces';
import { ReducerStateType } from '../../../Redux/reducers';

import { Views } from '../../../Constants/General';
import { TABLE_ROW_COUNT_OPTIONS } from '../../Custom/CustomTable/constants';
import HouseTable from '../HouseTable';

const SeeHouses = (props: SeeHousePropsType) => {
    const { currentView, houseTypes } = props;

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

    return (
        <div style={{ display: 'grid', gap: '20px' }}>
            <CardContainer title={cardContainerTitle} />
            <SwitchViewButtonSectionContainer title="Change View" />
            {currentView === Views.CARD ? 'Card view houses' : <HouseTable />}
            <CustomPagination
                page={currentPage}
                setPage={setCurrentPage}
                pageCount={Math.ceil(100 / housesPerPage)}
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
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SeeHouses);
