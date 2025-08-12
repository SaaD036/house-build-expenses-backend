import React from 'react';
import { NavLink } from 'react-router-dom';

import { Divider } from '@mui/material';

import { getSidebarItemsToRender } from '../utilities';
import { getUserFromToken } from '../../Utilities/Users/UserToken';

import { SidebarPropsTypes, SidebarItemsTypes } from '../interfaces';
import styles from '../styles.module.css';

const SideBar = (props: SidebarPropsTypes) => {
    const { onCloseSidebarDrawer } = props;
    const loggedInUser = getUserFromToken();

    const getSidebarItemStyle = ({
        isActive,
        isPending,
    }: {
        isActive: boolean;
        isPending: boolean;
    }) => {
        let className = `${styles.sidebarItems}`;

        if (isActive) {
            className = `${className} ${styles.sidebarItemsSelected}`;
        }

        return className;
    };

    const renderSidebarItem = (sidebarItem: SidebarItemsTypes, index: number): JSX.Element => {
        const { key, label, Icon } = sidebarItem;
        const shouldShowDivider = index !== getSidebarItemsToRender(loggedInUser).length - 1;

        return (
            <>
                <div className={`center ${styles.sidebarItemsContainer}`}>
                    <NavLink
                        to={`/${key}`}
                        className={getSidebarItemStyle}
                        onClick={onCloseSidebarDrawer}
                    >
                        {Icon && (
                            <span className="center">
                                <Icon
                                    sx={{ fontSize: '20px' }}
                                    className={styles.sidebarItemsIcon}
                                />
                            </span>
                        )}
                        <div>{label}</div>
                    </NavLink>
                </div>
                {shouldShowDivider && <Divider className={styles.sidebarItemsDivider} />}
            </>
        );
    };

    return (
        <div className={`center ${styles.sidebar}`}>
            {getSidebarItemsToRender(loggedInUser).map((sidebarItem, index) => {
                return renderSidebarItem(sidebarItem, index);
            })}
        </div>
    );
};

export default SideBar;
