import React from 'react';

import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

import styles from '../styles.module.css';

const CustomMenuItemLabel = ({
    Icon,
    label,
}: {
    Icon?: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & { muiName: string };
    label: React.ReactNode | string;
}) => {
    return (
        <div className={styles.menuItemLabelContainer}>
            {Icon && <Icon sx={{ color: '#158901', fontSize: '17px', marginRight: '5px' }} />}
            <div style={{ fontSize: '14px' }}>{label}</div>
        </div>
    );
};

export default CustomMenuItemLabel;
