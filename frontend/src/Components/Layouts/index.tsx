import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Drawer } from '@mui/material';
import { Menu as SidebarOpenIcon } from '@mui/icons-material';

import SideBar from './Sidebar';
import CustomErrorBoundary from '../Custom/CustomErrorBoundary';
import TabComponentLoader from '../Custom/CustomLoadingItems/TabComponentLoader';

import HBELogo from '../../../public/hbe-logo.png';
import { LayoutPropsTypes } from './interfaces';
import styles from './styles.module.css';

const Layout = ({
    children,
    houseSlug,
    isLoadingChildren,
    sidebarItemsLayer,
}: LayoutPropsTypes) => {
    const location = useLocation();

    const [openSidebarDrawer, setOpenSidebarDrawer] = useState(false);

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

    const renderSidebarSection = (onCloseSidebarDrawer: (() => void) | undefined) => {
        return (
            <div className="center" style={{ flexDirection: 'column', height: '100vh' }}>
                <div className={styles.sidebarTopSection}>
                    <Link to="/">
                        <img src={HBELogo} alt="sidebar-logo" style={{ height: '45px' }} />
                    </Link>
                </div>
                <SideBar
                    houseSlug={houseSlug}
                    sidebarItemsLayer={sidebarItemsLayer}
                    onCloseSidebarDrawer={onCloseSidebarDrawer}
                />
                {renderFooterSection()}
            </div>
        );
    };

    const renderSidebarOpenIconSection = () => {
        return (
            <>
                <div className={`center ${styles.sidebarOpenIconSection}`}>
                    <span onClick={() => setOpenSidebarDrawer(true)}>
                        <SidebarOpenIcon className={styles.sidebarOpenIcon} />
                    </span>
                </div>
                <Drawer open={openSidebarDrawer} onClose={() => setOpenSidebarDrawer(false)}>
                    {renderSidebarSection(() => setOpenSidebarDrawer(false))}
                </Drawer>
            </>
        );
    };

    return (
        <div style={{ display: 'flex' }}>
            <div className={`${styles.layout}`}>
                {renderSidebarOpenIconSection()}
                <div className={styles.sidebarContainer}>{renderSidebarSection(undefined)}</div>
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
