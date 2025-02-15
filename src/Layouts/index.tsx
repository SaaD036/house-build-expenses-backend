import React from 'react';

import SideBar from './Sidebar';

import { LayoutPropsTypes } from './interfaces';
import styles from './styles.module.css';

const Layout = (props: LayoutPropsTypes) => {
    const { children } = props;

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
            <div className={`center ${styles.layout}`}>
                <div style={{ height: '40px' }}></div>
                <SideBar />
                {renderFooterSection()}
            </div>
            <div className={styles.childrenSection}>{children}</div>
        </div>
    );
};

export default Layout;
