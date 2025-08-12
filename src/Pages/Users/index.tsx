import React from 'react';

import Header from '../../Components/Header';

import styles from './styles.module.css';

const UsersPage = () => {
    return (
        <div className={`pageComponent center ${styles.usersPage}`}>
            <Header components={<div></div>} />
            This is Users page
        </div>
    );
};

export default UsersPage;
