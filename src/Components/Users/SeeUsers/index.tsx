import React, { useState } from 'react';
import { connect } from 'react-redux';

import CardContainer from '../../CardContainer';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import SwitchViewButtonSectionContainer from '../../CardContainer/SwitchViewButtonSectionContainer';

import { Views } from '../../../Constants/General';

import { SeeUsersPropsType } from './interfaces';

const SeeUsers = (props: SeeUsersPropsType) => {
    const { currentView } = props;

    const [isLoadingExpenseData, setIsLoadingExpenseData] = useState(false);

    return (
        <div style={{ display: 'grid', gap: '20px' }}>
            {isLoadingExpenseData && <TabComponentLoader />}
            <CardContainer title="See Users" />
            <SwitchViewButtonSectionContainer title="Change View" />
            {currentView === Views.CARD ? 'Card view users' : 'Table view Users'}
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    currentView: state.general.currentView,
});

export default connect(mapStateToProps, null)(SeeUsers);
