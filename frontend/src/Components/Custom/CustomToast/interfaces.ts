import { ReactNode } from 'react';

export type ToastMessageType = 'info' | 'error' | 'success' | 'warning';

export type InitiateToastType = {
    type: ToastMessageType;
    message: string | ReactNode;
};
