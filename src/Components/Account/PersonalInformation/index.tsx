import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Avatar, Box } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

import CardContainer from '../../CardContainer';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import CustomTooltip from '../../Custom/CustomTooltip';

import { getLoggedInUser } from '../../../Redux/actions/userAction';

import { PersonalInformationPropsType } from './interfaces';

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
                </Box>
                <Box sx={sxOuter}>
                    <Box sx={sxInner}>Role</Box>
                </Box>
                <Box sx={sxOuter}>
                    <Box sx={sxInner}>Account Status</Box>
                </Box>
                <Box sx={sxOuter}>
                    <Box sx={sxInner}>Total Expense</Box>
                </Box>
                <Box sx={sxOuter}>
                    <Box sx={sxInner}>Total Expense Count</Box>
                </Box>
                <Box sx={sxOuter}>
                    <Box sx={sxInner}>Total Album</Box>
                </Box>
            </div>
        );
    };

    useEffect(() => {
        console.log('SaaD account user : ', accountUser);
    }, [accountUser]);

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
                <h1 className={styles.userFullName}>SaaD Ibne Jamal</h1>
                <CustomTooltip title="Edit">
                    <EditIcon className={`icon ${styles.editIcon}`} />
                </CustomTooltip>
            </Box>
            {renderOtherInfo()}
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    accountUser: state.user.accountUser,
});

const mapDispatchToProps = { getLoggedInUser };

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
