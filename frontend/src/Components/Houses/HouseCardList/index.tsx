import React from 'react';

import { Box, Grid } from '@mui/material';

import HouseCard from './HouseCard';

import styles from './styles.module.css';
import { HouseTablePropsType } from '../interfaces';

const HouseCardList = (props: HouseTablePropsType) => {
    const { houses } = props;

    return (
        <Box className={styles.houseListContainer}>
            <Grid container spacing={3}>
                {houses.map((h) => (
                    <Grid item xs={12} sm={6} md={4} key={h.slug}>
                        <HouseCard house={h} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default HouseCardList;
