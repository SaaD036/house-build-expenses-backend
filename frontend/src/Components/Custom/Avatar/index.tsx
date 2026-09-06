import React from 'react';

import styles from './styles.module.css';

const Avatar = ({ content }: { content: string | React.ReactNode }) => {
    const avatarContent =
        typeof content === 'string' ? (
            <div className={`${styles.avatarCircle} center`}>
                <b>{content.toUpperCase()}</b>
            </div>
        ) : (
            <div className={`${styles.avatarCircle} center`}>{content}</div>
        );

    return <div>{avatarContent}</div>;
};

export default Avatar;
