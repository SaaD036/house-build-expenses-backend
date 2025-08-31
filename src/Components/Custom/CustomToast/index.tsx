import React from 'react';
import { ToastContainer, Bounce, toast } from 'react-toastify';

import {
    CheckCircle as SuccessIcon,
    Report as ErrorIcon,
    BarChart as InfoIcon,
    Warning as WarningIcon,
    Cancel as CancelIcon,
} from '@mui/icons-material';

import { getToastStyle } from './utilities';

import { InitiateToastType } from './interfaces';
import styles from './styles.module.css';

const getToastMessageWithIcon = (params: InitiateToastType, dismissToast: () => void) => {
    const { message, type } = params;
    let Icon = SuccessIcon;
    let color = '#158901';

    if (type === 'error') {
        Icon = ErrorIcon;
        color = 'red';
    }

    if (type === 'info') {
        Icon = InfoIcon;
        color = '#030dc6ff';
    }

    if (type === 'warning') {
        Icon = WarningIcon;
        color = '#d87504ff';
    }

    return (
        <div className={`center-v ${styles.customToastMessageBody}`}>
            <div className="center-v">
                <Icon sx={{ fontSize: '20px', marginRight: '5px', marginLeft: '6px', color }} />
                {message}
            </div>
            <CancelIcon
                sx={{ fontSize: '20px' }}
                className={styles.closeButton}
                onClick={dismissToast}
            />
        </div>
    );
};

export const initiateToast = (params: InitiateToastType) => {
    const { type } = params;

    toast(
        getToastMessageWithIcon(params, () => toast.dismiss()),
        {
            type,
            ...getToastStyle(params.type),
        }
    );
};

const CustomToast = () => {
    return (
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            pauseOnFocusLoss
            pauseOnHover
            transition={Bounce}
            className={styles.customToastContainer}
            progressClassName={styles.customProgressBar}
            toastStyle={{ minHeight: '65px' }}
        />
    );
};

export default CustomToast;
