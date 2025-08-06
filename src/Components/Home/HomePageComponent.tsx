import React from 'react';

import CardContainer from '../CardContainer';
import TotalExpense from './HomePageComponentItems/TotalExpense';
import { Grid2 } from '@mui/material';

const HomePageComponent = () => {
    return (
        <div className="tabComponentWrapper">
            <CardContainer title="Dashboard" />
            <Grid2 container spacing={4}>
                <Grid2 size={{ md: 8 }}>
                    <TotalExpense />
                </Grid2>
            </Grid2>
        </div>
    );
};

export default HomePageComponent;
