import React from 'react';

import { Backdrop } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import styles from './styles.module.css';

const LinearLoadingItem = () => {
    return (
        <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open>
            <LinearProgress className={styles.linearProgress} />
        </Backdrop>
    );
};

export default LinearLoadingItem;
