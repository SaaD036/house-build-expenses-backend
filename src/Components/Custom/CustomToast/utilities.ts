import { ToastOptions } from 'react-toastify';

import { ToastMessageType } from './interfaces';

export const getToastStyle = (type: ToastMessageType): Partial<ToastOptions> => {
    let toastStyle: Partial<ToastOptions> = {
        icon: false,
        closeButton: false,
    };

    if (type === 'error') {
        toastStyle = {
            ...toastStyle,
            progressStyle: {
                backgroundColor: 'red',
            },
        };
    }

    if (type === 'warning') {
        toastStyle = {
            ...toastStyle,
            progressStyle: {
                backgroundColor: '#d87504ff',
            },
        };
    }

    if (type === 'info') {
        toastStyle = {
            ...toastStyle,
            progressStyle: {
                backgroundColor: '#030dc6ff',
            },
        };
    }

    if (type === 'success') {
        toastStyle = {
            ...toastStyle,
            progressStyle: {
                backgroundColor: '#158901',
            },
        };
    }

    return toastStyle;
};
