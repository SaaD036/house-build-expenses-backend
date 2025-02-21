import React from 'react';

import { Overlay, Popover } from 'react-bootstrap';

import { CustomPopoverProps } from './interfaces';
import styles from './styles.module.css';

const CustomPopover = (props: CustomPopoverProps) => {
    const { children, title, anchorEl, onClose } = props;

    const renderPopoverHeader = () => {
        if (typeof title !== 'string') {
            return title;
        }

        return <b>{title}</b>;
    };

    return (
        <div>
            <Overlay show={Boolean(anchorEl)} target={anchorEl} rootClose onHide={onClose}>
                <Popover id="popover-contained" className={styles.popover}>
                    <Popover.Header className={styles.popoverHeader}>
                        {renderPopoverHeader()}
                    </Popover.Header>
                    <Popover.Body>{children}</Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
};

export default CustomPopover;
