import React from 'react';

import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { SIDEBAR_ITEMS_LAYER } from './Sidebar/constants';

export type LayoutPropsTypes = {
    children: React.ReactNode;
    sidebarItemsLayer: keyof typeof SIDEBAR_ITEMS_LAYER;
};

export type SidebarPropsTypes = {
    sidebarItemsLayer: keyof typeof SIDEBAR_ITEMS_LAYER;
    onCloseSidebarDrawer?: () => void;
};

export type SidebarItemsTypes = {
    key: string;
    label: string;
    access: SidebarItemAccessType;
    Icon?: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & { muiName: string };
};

export type SidebarItemAccessType = 'all' | 'admin' | 'self';
