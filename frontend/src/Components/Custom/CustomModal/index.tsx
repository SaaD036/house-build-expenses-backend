import React from 'react';

import { Modal } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import CustomErrorBoundary from '../CustomErrorBoundary';

import { CustomModalPropTypes } from './interfaces';
import styles from './styles.module.css';

const CustomModal = (props: CustomModalPropTypes) => {
    const { children, title, open, onClose } = props;

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                className={styles.modalContainer}
            >
                <div className={styles.titleContainer}>
                    <div className={styles.title}>{title}</div>
                    <CancelIcon className={styles.closeIcon} onClick={onClose} />
                </div>
                <CustomErrorBoundary key={String(open)}>
                    <div className={styles.childrenContainer}>{children}</div>
                </CustomErrorBoundary>
            </div>
        </Modal>
    );
};

export default CustomModal;
