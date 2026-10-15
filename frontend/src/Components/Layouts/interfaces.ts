import React from 'react';

import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { SIDEBAR_ITEMS_LAYER } from './Sidebar/constants';

export type LayoutPropsTypes = {
    houseSlug?: string;
    children: React.ReactNode;
    sidebarItemsLayer: keyof typeof SIDEBAR_ITEMS_LAYER;
};

export type SidebarPropsTypes = {
    houseSlug?: string | null;
    onCloseSidebarDrawer?: () => void;
    sidebarItemsLayer: keyof typeof SIDEBAR_ITEMS_LAYER;
};

export type SidebarItemsTypes = {
    key: string;
    label: string;
    access: SidebarItemAccessType;
    Icon?: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & { muiName: string };
};

export type SidebarItemAccessType = 'all' | 'admin' | 'self';
