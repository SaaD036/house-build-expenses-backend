import React from 'react';
import { Tooltip } from '@mui/material';

import { CustomTooltipPropsType } from './interfaces';

const CustomTooltip = (props: CustomTooltipPropsType) => {
    const { children, title } = props;

    return (
        <Tooltip
            title={title}
            arrow
            componentsProps={{
                tooltip: {
                    sx: {
                        bgcolor: '#158901',
                        '& .MuiTooltip-arrow': {
                            color: '#158901',
                        },
                    },
                },
            }}
        >
            {children}
        </Tooltip>
    );
};

export default CustomTooltip;
