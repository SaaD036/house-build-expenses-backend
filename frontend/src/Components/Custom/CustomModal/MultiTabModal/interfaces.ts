import React from 'react';

export type MultiTabModalTabItemType = {
    key: string;
    label: string;
    content: string | React.ReactNode;
};

export type MultiTabModalPropTypes = {
    open: boolean;
    title: string | React.ReactNode;
    onClose: () => void;
    tabs: MultiTabModalTabItemType[];
    defaultTabId: string;
};
