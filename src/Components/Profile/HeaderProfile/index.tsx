import React, { useState } from 'react';

import { SvgIconTypeMap, Tooltip } from '@mui/material';
import {
    ExpandCircleDownOutlined as ArrowDropDownIcon,
    ArrowCircleUpOutlined as ArrowUpIcon,
    PersonOutlineOutlined as ProfileIcon,
    ManageHistoryOutlined as SettingsIcon,
    LogoutOutlined as LogoutIcon,
} from '@mui/icons-material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import Avatar from '../../Custom/Avatar';
import CustomMenu from '../../Custom/CustomMenu';

import styles from './styles.module.css';

const HeaderProfile = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const getProfileMenuItems = () => {
        return [
            {
                key: 'profile',
                label: renderProfileMenuLabel(ProfileIcon, 'View Profile'),
                onClick: () => {},
            },
            {
                key: 'settings',
                label: renderProfileMenuLabel(SettingsIcon, 'Settings'),
                onClick: () => {},
            },
            {
                key: 'log-out',
                label: renderProfileMenuLabel(LogoutIcon, 'Log out'),
                onClick: () => {},
            },
        ];
    };

    const renderProfileMenuLabel = (
        Icon: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & { muiName: string },
        label: string
    ) => {
        return (
            <div className={styles.menuItemContainer}>
                <Icon sx={{ color: '#158901', fontSize: '17px' }} />
                <div className={styles.menuItemLabel}>{label}</div>
            </div>
        );
    };

    const renderAvatarContent = () => {
        return (
            <div className={styles.avatarCircle}>
                <Tooltip title="SaaD Ibne Jamal">
                    <b>SIJ</b>
                </Tooltip>
            </div>
        );
    };

    const renderDropdownIcon = () => {
        const Icon = anchorEl ? ArrowUpIcon : ArrowDropDownIcon;

        return <Icon sx={{ color: '#158901' }} className={styles.arrowIcon} />;
    };

    return (
        <div className={styles.headerProfileContainer}>
            <CustomMenu
                id="header-profile-menu"
                items={getProfileMenuItems()}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            />
            <Avatar content={renderAvatarContent()} />
            <div
                className={styles.arrowIconContainer}
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                {renderDropdownIcon()}
            </div>
        </div>
    );
};

export default HeaderProfile;
