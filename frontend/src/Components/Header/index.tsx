import React from 'react';

import HeaderProfile from '../Profile/HeaderProfile';

import styles from './styles.module.css';

const Header = ({ components }: { components: React.ReactNode }) => {
    return (
        <div className={styles.expensesPageWrapper}>
            <div className={styles.componentSection}>{components}</div>
            <div className={styles.profileSection}>
                <HeaderProfile />
            </div>
        </div>
    );
};

export default Header;
