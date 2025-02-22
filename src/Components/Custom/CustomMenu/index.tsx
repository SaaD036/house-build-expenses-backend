import React from 'react';

import { Menu, MenuItem } from '@mui/material';

import CustomMenuItemLabel from './CustomMenuItemLabel';

import { CustomMenuProps, CutomMenuItemsType } from './interfaces';
import styles from './styles.module.css';

const CustomMenu = (props: CustomMenuProps) => {
    const { id, items, open, anchorEl, onClose } = props;

    const onMenuItemClick = (menuItem: CutomMenuItemsType) => {
        const { onClick } = menuItem;

        onClick();
        onClose();
    };

    return (
        <Menu
            id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                },
            }}
        >
            {items.map((menuItem) => (
                <MenuItem
                    key={menuItem.key}
                    onClick={() => onMenuItemClick(menuItem)}
                    className={styles.menuItem}
                >
                    <CustomMenuItemLabel label={menuItem.label} Icon={menuItem.Icon} />
                </MenuItem>
            ))}
        </Menu>
    );
};

export default CustomMenu;
