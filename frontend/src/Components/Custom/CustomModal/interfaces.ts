import React from 'react';

export type CustomModalPropTypes = {
    open: boolean;
    title: string | React.ReactNode;
    onClose: () => void;
    children: string | React.ReactNode;
};
