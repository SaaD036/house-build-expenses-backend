import React, { useState } from 'react';

import { Drawer } from '@mui/material';
import { Menu as SidebarOpenIcon } from '@mui/icons-material';

import SideBar from './Sidebar';

import { LayoutPropsTypes } from './interfaces';
import styles from './styles.module.css';

const Layout = (props: LayoutPropsTypes) => {
    const { children } = props;

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
                    <SideBar onCloseSidebarDrawer={() => setOpenSidebarDrawer(false)} />
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
                    <SideBar />
                </div>
                {renderFooterSection()}
            </div>
            <div className={styles.childrenSection}>{children}</div>
        </div>
    );
};

export default Layout;
