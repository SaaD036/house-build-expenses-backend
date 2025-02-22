import React from 'react';

import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export type CutomMenuItemsType = {
    key: string;
    label: string | React.ReactNode;
    Icon?: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & { muiName: string };
    onClick: () => void;
};

export type CustomMenuProps = {
    id: string;
    items: CutomMenuItemsType[];
    open: boolean;
    anchorEl: null | HTMLElement;
    onClose: () => void;
};
