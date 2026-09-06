import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Avatar, Box } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

import CardContainer from '../../CardContainer';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import CustomTooltip from '../../Custom/CustomTooltip';
import CustomCopyIcon from '../../Custom/CustomIcons/CustomCopyIcon';

import { getLoggedInUser } from '../../../Redux/actions/userAction';

import { PersonalInformationPropsType } from './interfaces';
import { ReducerStateType } from '../../../Redux/reducers';

import styles from './styles.module.css';

const PersonalInformation = (props: PersonalInformationPropsType) => {
    const { getLoggedInUser, accountUser } = props;

    const [isLoadingUserData, setIsLoadingUserData] = useState(false);

    const loadAccountUserData = async () => {
        setIsLoadingUserData(true);
        await getLoggedInUser();
        setIsLoadingUserData(false);
    };

    const renderOtherInfo = () => {
        const sxOuter = { display: 'flex', alignItems: 'center', gap: '15px' };
        const sxInner = {
            padding: '3px 7px',
            border: '0.8px solid #158901',
            borderRadius: '3px',
        };

        return (
            <div style={{ display: 'grid', gap: '7px' }}>
                <Box sx={sxOuter}>
                    <Box sx={sxInner}>Email</Box>
                    <Box sx={{ cursor: 'pointer' }}>{accountUser?.email}</Box>
                    {accountUser?.email && (
                        <CustomCopyIcon
                            textToCopy={accountUser.email}
                            toastMessage="Email copied to clipboard"
                        />
                    )}
                </Box>
                <Box sx={sxOuter}>
                    <Box sx={sxInner}>Role</Box>
                    <Box>{accountUser?.role}</Box>
                </Box>
                <Box sx={sxOuter}>
                    <Box sx={sxInner}>Account Status</Box>
                    <Box>{accountUser?.accountStatus}</Box>
                </Box>
                <Box sx={sxOuter}>
                    <Box sx={sxInner}>Total Expense</Box>
                    <Box>{accountUser?.totalExpense || 0} BDT</Box>
                </Box>
                <Box sx={sxOuter}>
                    <Box sx={sxInner}>Total Expense Count</Box>
                    <Box>{accountUser?.totalExpenseCount || 0}</Box>
                </Box>
                <Box sx={sxOuter}>
                    <Box sx={sxInner}>Total Album</Box>
                </Box>
            </div>
        );
    };

    useEffect(() => {
        loadAccountUserData();
    }, []);

    return (
        <div style={{ display: 'grid', gap: '20px' }}>
            {isLoadingUserData && <TabComponentLoader />}
            <CardContainer title="Your info" />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Box sx={{ borderRadius: '50%', border: '2px solid #158901', padding: '3px' }}>
                    <Avatar sx={{ padding: '2px' }} className={styles.avatar} src="/" />
                </Box>
                <h1 className={styles.userFullName}>
                    {accountUser?.firstName} {accountUser?.lastName}
                </h1>
                <CustomTooltip title="Edit">
                    <EditIcon className={`icon ${styles.editIcon}`} />
                </CustomTooltip>
            </Box>
            {renderOtherInfo()}
        </div>
    );
};

const mapStateToProps = (state: ReducerStateType) => ({
    accountUser: state.user.accountUser,
});

const mapDispatchToProps = { getLoggedInUser };

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
