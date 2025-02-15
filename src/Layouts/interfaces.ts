import React from 'react';

import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export type LayoutPropsTypes = {
    children: React.ReactNode;
};

export type SidebarItemsTypes = {
    key: string;
    label: string;
    access: string;
    Icon?: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & { muiName: string };
};
