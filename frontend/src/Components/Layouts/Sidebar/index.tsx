import React, { useMemo } from 'react';
import { NavLink, NavLinkRenderProps } from 'react-router-dom';

import { Divider } from '@mui/material';

import { getSidebarItemsToRender } from '../utilities';
import { getUserFromToken } from '../../../Utilities/Users/UserToken';

import { SidebarPropsTypes, SidebarItemsTypes } from '../interfaces';
import styles from '../styles.module.css';

const SideBar = (props: SidebarPropsTypes) => {
    const { houseSlug, sidebarItemsLayer, onCloseSidebarDrawer } = props;
    const loggedInUser = getUserFromToken();

    const sideBarItems = useMemo(
        () =>
            getSidebarItemsToRender(sidebarItemsLayer, loggedInUser?.role ?? null, {
                houseSlug: houseSlug ?? '',
            }),
        [sidebarItemsLayer, loggedInUser?.role, houseSlug]
    );

    const getSidebarItemStyle = ({ isActive }: NavLinkRenderProps) => {
        let className = `${styles.sidebarItems}`;

        if (isActive) {
            className = `${className} ${styles.sidebarItemsSelected}`;
        }

        return className;
    };

    const renderSidebarItem = (sidebarItem: SidebarItemsTypes, index: number): JSX.Element => {
        const { key, label, Icon } = sidebarItem;
        const shouldShowDivider = index !== sideBarItems.length - 1;

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
            {sideBarItems.map((sidebarItem, index) => {
                return renderSidebarItem(sidebarItem, index);
            })}
        </div>
    );
};

export default SideBar;
