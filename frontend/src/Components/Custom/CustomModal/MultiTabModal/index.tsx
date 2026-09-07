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
    const [activeTabId, setActiveTabId] = useState<string>(defaultTabId);

    const activeTab = tabs.find((tab) => tab.key === activeTabId);

    return (
        <CustomModal open={open} onClose={onClose} title={title}>
            <div className={styles.bodyLayout}>
                <div className={styles.tabSidebar}>
                    {tabs.map((tab) => {
                        const isActive = tab.key === activeTabId;

                        return (
                            <button
                                key={tab.key}
                                type="button"
                                className={`${styles.tabItem} ${isActive ? styles.activeTab : ''}`}
                                onClick={() => setActiveTabId(tab.key)}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
                <div className={styles.contentArea}>{activeTab?.content ?? ''}</div>
            </div>
        </CustomModal>
    );
};

export default MultiTabModal;
