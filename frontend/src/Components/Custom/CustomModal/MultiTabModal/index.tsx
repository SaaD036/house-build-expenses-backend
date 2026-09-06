import React, { useState } from 'react';

import CustomModal from '../';

import styles from './styles.module.css';
import { MultiTabModalPropTypes } from './interfaces';

const MultiTabModal = ({
    open,
    onClose,
    title,
    tabs = [],
    defaultTabId,
}: MultiTabModalPropTypes) => {
    const [activeTabId, setActiveTabId] = useState(
        defaultTabId || (tabs.length > 0 ? tabs[0].id : null)
    );

    const activeTab = tabs.find((tab) => tab.id === activeTabId);

    return (
        <CustomModal open={open} onClose={onClose} title={title}>
            <div className={styles.bodyLayout}>
                <div className={styles.tabSidebar}>
                    {tabs.map((tab) => {
                        const isActive = tab.id === activeTabId;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                className={`${styles.tabItem} ${isActive ? styles.activeTab : ''}`}
                                onClick={() => setActiveTabId(tab.id)}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
                <div className={styles.contentArea}>{activeTab ? activeTab.content : null}</div>
            </div>
        </CustomModal>
    );
};

export default MultiTabModal;
