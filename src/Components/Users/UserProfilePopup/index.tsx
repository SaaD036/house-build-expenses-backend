import React from 'react';

import Avatar from '../../Custom/Avatar';

import { getAvatarContentFromName } from '../../Profile/HeaderProfile/utilites';

import styles from './styles.module.css';

const UserProfilePopup = (props: { id: number }) => {
    const { id } = props;

    const renderAvatarContent = () => {
        const avatarContent = getAvatarContentFromName('SaaD');

        return (
            <div className={styles.avatarCircle}>
                <b>{avatarContent}</b>
            </div>
        );
    };

    return (
        <div className={styles.userProfilePopupContainer}>
            <div className="center-v">
                <Avatar content={renderAvatarContent()} />
                <h4 className={styles.userName}>SaaD Ibne Jamal</h4>
            </div>
        </div>
    );
};

export default UserProfilePopup;
