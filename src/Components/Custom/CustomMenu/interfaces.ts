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
    items: CutomMenuItemsType[];
    open: boolean;
    anchorEl: null | HTMLElement;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};
