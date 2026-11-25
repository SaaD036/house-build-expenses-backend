import React from 'react';
import { Container } from '@mui/material';

import styles from './styles.module.css';

const CustomErrorMessage = ({ errorMessage }: { errorMessage: string | React.ReactNode }) => {
    return (
        <Container className="center">
            <div className={styles.formDisabledMessage}>{errorMessage}</div>
        </Container>
    );
};

export default CustomErrorMessage;
