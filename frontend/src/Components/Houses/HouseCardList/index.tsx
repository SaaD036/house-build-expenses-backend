import React, { useMemo } from 'react';

import { Box, Grid } from '@mui/material';

import HouseCard from './HouseCard';
import HouseNotFound from '../HouseNotFound';

import styles from './styles.module.css';
import { HouseTablePropsType } from '../interfaces';

const HouseCardList = (props: HouseTablePropsType) => {
    const { houses, houseTypes } = props;

    const noHouseMessage = useMemo(() => {
        if (houseTypes === 'your_created') {
            return 'Your have not created any house';
        }

        if (houseTypes === 'shared') {
            return 'No hause is shared with you';
        }

        if (houseTypes === 'requested') {
            return 'You have no unapproved Houses';
        }
    }, [houseTypes]);

    if (houses.length === 0) {
        return <HouseNotFound title={noHouseMessage} />;
    }

    return (
        <Box className={styles.projectListContainer}>
            <Grid container spacing={3} className={styles.projectsGrid}>
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
