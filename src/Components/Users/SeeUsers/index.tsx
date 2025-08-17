import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import CardContainer from '../../CardContainer';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import SwitchViewButtonSectionContainer from '../../CardContainer/SwitchViewButtonSectionContainer';
import SeeUsersTable from './SeeUsersTable';
import CustomPagination from '../../Custom/CustomPagination';

import { getAllUsers } from '../../../Redux/actions/userAction';

import { Views } from '../../../Constants/General';
import { TABLE_ROW_COUNT_OPTIONS } from '../../Custom/CustomTable/constants';

import { SeeUsersPropsType } from './interfaces';

const SeeUsers = (props: SeeUsersPropsType) => {
    const { currentView, users, totalUsers, getAllUsers } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(TABLE_ROW_COUNT_OPTIONS[0]);

    const [isLoadingExpenseData, setIsLoadingExpenseData] = useState(false);

    const loadUsersData = async (filters: any) => {
        setIsLoadingExpenseData(true);

        try {
            await getAllUsers(null);
            setIsLoadingExpenseData(false);
        } catch (error) {
            setIsLoadingExpenseData(false);
        }
    };

    useEffect(() => {
        loadUsersData(null);
    }, []);

    return (
        <div style={{ display: 'grid', gap: '20px' }}>
            {isLoadingExpenseData && <TabComponentLoader />}
            <CardContainer title="See Users" />
            <SwitchViewButtonSectionContainer title="Change View" />
            {currentView === Views.CARD ? (
                'Card view users'
            ) : (
                <SeeUsersTable
                    users={users || []}
                    totalUsers={totalUsers || 0}
                    loadTableData={loadUsersData}
                />
            )}
            <CustomPagination
                page={currentPage}
                setPage={setCurrentPage}
                pageCount={Math.ceil((totalUsers || 0) / usersPerPage)}
                itemsPerPage={{
                    itemsPerPageCount: TABLE_ROW_COUNT_OPTIONS,
                    selectedItemsPerPage: usersPerPage,
                    setItemsPerPageCount: (sizePerPage) => setUsersPerPage(sizePerPage),
                }}
            />
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    currentView: state.general.currentView,
    users: state.user.users,
    totalUsers: state.user.totalUsers,
});

const mapDispatchToProps = {
    getAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(SeeUsers);
