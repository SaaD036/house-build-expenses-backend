import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import CardContainer from '../../CardContainer';
import SwitchViewButtonSectionContainer from '../../CardContainer/SwitchViewButtonSectionContainer';
import CustomPagination from '../../Custom/CustomPagination';
import SeeDOtable from './SeeDOtable';

import { getAllDOs } from '../../../Redux/actions/doAction';

import { Views } from '../../../Constants/General';

import { ReducerStateType } from '../../../Redux/reducers';
import { SeeDOsPropsType } from './interfaces';

const SeeDOs = (props: SeeDOsPropsType) => {
    const { currentView, dos, getAllDOs } = props;

    const [isLoadingDOdata, setIsLoadingDOdata] = useState(false);

    const loadDOs = async () => {
        setIsLoadingDOdata(true);

        await getAllDOs(null);

        setIsLoadingDOdata(false);
    };

    useEffect(() => {
        loadDOs();
    }, []);

    return (
        <div style={{ display: 'grid', gap: '20px' }}>
            {isLoadingDOdata && <TabComponentLoader />}
            <CardContainer title="See DOs" />
            <SwitchViewButtonSectionContainer title="Change View" />
            {currentView === Views.CARD ? (
                'Card view DOs'
            ) : (
                <SeeDOtable DOs={dos || null} loadDOs={loadDOs} />
            )}
            <CustomPagination page={1} setPage={() => {}} pageCount={1} />
        </div>
    );
};

const mapStateToProps = (state: ReducerStateType) => ({
    currentView: state.general.currentView,
    dos: state.do.dos,
    doCount: state.do.doCount,
});

const mapDispatchToProps = { getAllDOs };

export default connect(mapStateToProps, mapDispatchToProps)(SeeDOs);
