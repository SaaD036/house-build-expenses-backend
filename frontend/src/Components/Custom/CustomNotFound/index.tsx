import React from 'react';

import Box from '@mui/material/Box';
import NotFoundIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import styles from './styles.module.css';
import { IconTypes } from '../../../Types/IconsAndImages';

type CustomNotFoundPropTypes = {
    title?: string;
    Icon?: IconTypes;
    iconSize?: number;
    className?: string;
};

const CustomNotFound = (props: CustomNotFoundPropTypes) => {
    const { Icon, iconSize, title, className } = props;
    const IconToRender = Icon ?? NotFoundIcon;
    const titleToRender = title ?? 'Resource not found';

    return (
        <div className={`${className || ''} center ${styles.container}`}>
            <Box>
                <IconToRender
                    className={styles.icon}
                    sx={{ fontSize: iconSize ? `${iconSize}px` : '120px' }}
                />
            </Box>
            <div className={`text-gray ${styles.title}`}>{titleToRender}</div>
        </div>
    );
};

export default CustomNotFound;
