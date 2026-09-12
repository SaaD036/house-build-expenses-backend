import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styles from './styles.module.css';

const CustomSectionDivider = ({ title }: { title: string }) => {
    return (
        <Box className={styles.dividerContainer}>
            <span className={styles.line} />
            <Typography variant="h6" className={styles.title}>
                {title}
            </Typography>
            <span className={styles.line} />
        </Box>
    );
};

export default CustomSectionDivider;
