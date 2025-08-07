import React from 'react';

import { Grid2 } from '@mui/material';

import CardContainer from '../CardContainer';
import TotalExpense from './HomePageComponentItems/TotalExpense';
import TotalExpenseForThisYear from './HomePageComponentItems/TotalExpenseForThisYear';

const HomePageComponent = () => {
    return (
        <div className="tabComponentWrapper">
            <CardContainer title="Dashboard" />
            <Grid2 container spacing={4} marginTop={3}>
                <Grid2 size={{ sm: 12, md: 8 }}>
                    <TotalExpense />
                </Grid2>
                <Grid2 size={{ sm: 12, md: 4 }}>
                    <TotalExpenseForThisYear />
                </Grid2>
            </Grid2>
        </div>
    );
};

export default HomePageComponent;
