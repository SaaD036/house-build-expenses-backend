import React from 'react';

import { Backdrop } from '@mui/material';

import styles from './styles.module.css';

const TabComponentLoader = () => {
    return (
        <Backdrop
            sx={(theme) => ({
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                zIndex: theme.zIndex.drawer + 1,
            })}
            open
        >
            <div className={styles.tabComponentLoader}></div>
        </Backdrop>
    );
};

export default TabComponentLoader;
