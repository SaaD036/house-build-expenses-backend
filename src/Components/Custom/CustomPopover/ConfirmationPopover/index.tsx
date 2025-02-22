import React from 'react';

import CustomPopover from '..';

import { ConfirmationPopoverProps } from '../interfaces';
import styles from './styles.module.css';

const ConfirmationPopover = (props: ConfirmationPopoverProps) => {
    const { id, title, confirmationMessage, isDeletion, anchorEl, onClose, onCancel, onYes } =
        props;

    const getConfirmButtonStyles = () => {
        return isDeletion ? styles.confirmPopoverDeleteButton : styles.confirmPopoverConfirmButton;
    };

    const renderPopoverHeader = () => {
        if (typeof title !== 'string') {
            return title || <b>Confirmation</b>;
        }

        return <b>{title}</b>;
    };

    const renderConfirmationText = () => {
        if (!confirmationMessage) {
            const confirmationMessageText = isDeletion
                ? 'Are you sure to delete this item?'
                : 'Are you sure to continue?';

            return <div className={styles.confirmPopoverBodyText}>{confirmationMessageText}</div>;
        }

        if (typeof confirmationMessage === 'string') {
            return <div className={styles.confirmPopoverBodyText}>{confirmationMessage}</div>;
        }

        return confirmationMessage;
    };

    return (
        <CustomPopover
            id={id}
            anchorEl={anchorEl}
            onClose={onClose}
            title={renderPopoverHeader()}
            bodyClassname={styles.confirmPopoverBody}
        >
            <div>
                {renderConfirmationText()}
                <div className={`center ${styles.confirmPopoverButtonSection}`}>
                    <div
                        className={`
                            center
                            ${styles.confirmPopoverButton}
                            ${styles.confirmPopoverCancelButton}
                        `}
                        onClick={onCancel ? onCancel : onClose}
                    >
                        CANCEL
                    </div>
                    <div
                        className={`
                            center
                            ${styles.confirmPopoverButton}
                            ${getConfirmButtonStyles()}
                        `}
                        onClick={onYes}
                    >
                        {isDeletion ? 'DELETE' : 'CONTINUE'}
                    </div>
                </div>
            </div>
        </CustomPopover>
    );
};

export default ConfirmationPopover;
