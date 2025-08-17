import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CardContainer from '../../CardContainer';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import SwitchViewButtonSectionContainer from '../../CardContainer/SwitchViewButtonSectionContainer';

import { getAllUsers } from '../../../Redux/actions/userAction';

import { Views } from '../../../Constants/General';

import { SeeUsersPropsType } from './interfaces';

const SeeUsers = (props: SeeUsersPropsType) => {
    const { currentView, getAllUsers } = props;

    const [isLoadingExpenseData, setIsLoadingExpenseData] = useState(false);

    const loadUsersData = async () => {
        setIsLoadingExpenseData(true);

        try {
            await getAllUsers(null);
            setIsLoadingExpenseData(false);
        } catch (error) {
            setIsLoadingExpenseData(false);
        }
    };

    useEffect(() => {
        loadUsersData();
    }, []);

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

const mapDispatchToProps = {
    getAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(SeeUsers);
