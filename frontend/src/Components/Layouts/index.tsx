import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Drawer } from '@mui/material';
import { Menu as SidebarOpenIcon } from '@mui/icons-material';

import SideBar from './Sidebar';
import CustomErrorBoundary from '../Custom/CustomErrorBoundary';

import { LayoutPropsTypes } from './interfaces';
import styles from './styles.module.css';
import TabComponentLoader from '../Custom/CustomLoadingItems/TabComponentLoader';

const Layout = (props: LayoutPropsTypes) => {
    const { children, houseSlug, isLoadingChildren, sidebarItemsLayer } = props;
    const location = useLocation();

    const [openSidebarDrawer, setOpenSidebarDrawer] = useState(false);

    const renderSidebarOpenIconSection = () => {
        return (
            <>
                <div className={`center ${styles.sidebarOpenIconSection}`}>
                    <span onClick={() => setOpenSidebarDrawer(true)}>
                        <SidebarOpenIcon className={styles.sidebarOpenIcon} />
                    </span>
                </div>
                <Drawer open={openSidebarDrawer} onClose={() => setOpenSidebarDrawer(false)}>
                    <SideBar
                        houseSlug={houseSlug}
                        sidebarItemsLayer={sidebarItemsLayer}
                        onCloseSidebarDrawer={() => setOpenSidebarDrawer(false)}
                    />
                </Drawer>
            </>
        );
    };

    const renderFooterSection = () => {
        // eslint-disable-next-line quotes
        const FOOTER_TEXT = "A SaaD's product";

        return (
            <div className={`center ${styles.footer}`}>
                <div className="center">
                    <span>{FOOTER_TEXT}</span>
                </div>
            </div>
        );
    };

    return (
        <div style={{ display: 'flex' }}>
            <div className={`${styles.layout}`}>
                {renderSidebarOpenIconSection()}
                <div className={styles.sidebarContainer}>
                    <h1>HBE</h1>
                    <SideBar houseSlug={houseSlug} sidebarItemsLayer={sidebarItemsLayer} />
                </div>
                {renderFooterSection()}
            </div>
            <CustomErrorBoundary key={location.pathname}>
                {isLoadingChildren ? (
                    <TabComponentLoader />
                ) : (
                    <div className={styles.childrenSection}>{children}</div>
                )}
            </CustomErrorBoundary>
        </div>
    );
};

export default Layout;
