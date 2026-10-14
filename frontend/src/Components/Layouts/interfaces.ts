import React from 'react';

import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export type LayoutPropsTypes = {
    children: React.ReactNode;
};

export type SidebarPropsTypes = {
    onCloseSidebarDrawer?: () => void;
};

export type SidebarItemsTypes = {
    key: string;
    label: string;
    access: SidebarItemAccessType;
    Icon?: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & { muiName: string };
};

export type SidebarItemAccessType = 'all' | 'admin' | 'self';
