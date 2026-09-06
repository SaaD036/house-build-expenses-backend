import React from 'react';

export type MultiTabModalPropTypes = {
    open: boolean;
    title: string | React.ReactNode;
    onClose: () => void;
    tabs: { id: string; label: string; content: React.ReactNode }[];
    defaultTabId: string;
};
