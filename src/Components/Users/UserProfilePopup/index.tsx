import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Box } from '@mui/material';
import {
    Email as EmailIcon,
    CoPresent as RoleIcon,
    ConfirmationNumber as TotalExpenseCountIcon,
} from '@mui/icons-material';

import Avatar from '../../Custom/Avatar';

import { getSingleUser } from '../../../Redux/actions/userAction';

import { getAvatarContentFromName } from '../../Profile/HeaderProfile/utilites';

import { UserType } from '../../../Types/Users';

import styles from './styles.module.css';

const UserProfilePopup = (props: {
    id: number;
    getSingleUser: (userId: number) => Promise<UserType | undefined>;
}) => {
    const { id, getSingleUser } = props;

    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [popupUser, setPopupUser] = useState<UserType>();

    const loadUserData = async () => {
        setShowLoader(true);

        const user = await getSingleUser(id);

        setPopupUser(user);
        setShowLoader(false);
    };

    const renderAvatarContent = () => {
        const avatarContent = getAvatarContentFromName(
            `${popupUser?.firstName} ${popupUser?.lastName}`
        );

        return (
            <div className={styles.avatarCircle}>
                <b>{avatarContent}</b>
            </div>
        );
    };

    useEffect(() => {
        loadUserData();
    }, [id]);

    if (showLoader) {
        //
    }

    if (!popupUser) {
        return <></>;
    }

    return (
        <div className={styles.userProfilePopupContainer}>
            <div className="center-h">
                <Avatar content={renderAvatarContent()} />
                <Box sx={{ marginTop: '3px' }}>
                    <h4 className={styles.userName}>
                        {popupUser.firstName} {popupUser.lastName}
                    </h4>
                    <div className="center-v">
                        <EmailIcon className={`icon ${styles.userPopupIcon}`} />
                        <div className={styles.userPopUpInfoRow}>{popupUser.email}</div>
                    </div>
                    <div className="center-v">
                        <RoleIcon className={`icon ${styles.userPopupIcon}`} />
                        <div className={styles.userPopUpInfoRow}>
                            {popupUser.role.charAt(0).toUpperCase() + popupUser.role.slice(1)}
                        </div>
                    </div>
                    <div className="center-v">
                        <TotalExpenseCountIcon className={`icon ${styles.userPopupIcon}`} />
                        <div className={styles.userPopUpInfoRow}>
                            {popupUser.totalExpenseCount} expense
                            {popupUser.totalExpenseCount && popupUser.totalExpenseCount > 1 && 's'}
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    loggedInUser: state.auth.loggedInUser,
});

const mapDispatchToProps = {
    getSingleUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePopup);
