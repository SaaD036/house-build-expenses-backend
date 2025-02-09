import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Tab, Tabs } from '@mui/material';

import { CustomTabProps } from './interfaces';
import styles from './styles.module.css';

const CustomTab = (props: CustomTabProps) => {
    const { selectedTab, tabItems, onTabSelect } = props;

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const onClickTabItem = (tab: string) => {
        onTabSelect(tab);

        if (tab !== selectedTab) {
            navigate(`${pathname}?tab=${tab}`);
        }
    };

    return (
        <Box sx={{ bgcolor: 'rgb(242, 244, 247)' }}>
            <Tabs
                value={selectedTab}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                onChange={(event, newValue) => onClickTabItem(newValue)}
                className={styles.tabs}
                sx={{ '& button.Mui-selected': { color: '#158901' } }}
                TabIndicatorProps={{ style: { background: '#158901' } }}
                aria-label="scrollable force tabs example"
            >
                {(tabItems || []).map((item) => {
                    return (
                        <Tab
                            key={`tab-item-${item.value}`}
                            label={item.label}
                            value={item.value}
                            onClick={() => onTabSelect(item.value)}
                            sx={{ fontSize: '12px' }}
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
};

export default CustomTab;
