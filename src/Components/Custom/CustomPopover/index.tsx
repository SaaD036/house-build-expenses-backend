import React from 'react';

import { Overlay, Popover } from 'react-bootstrap';

import { CustomPopoverProps } from './interfaces';
import styles from './styles.module.css';

const CustomPopover = (props: CustomPopoverProps) => {
    const { id, children, title, anchorEl, className, headerClassName, bodyClassname, onClose } =
        props;

    const renderPopoverHeader = () => {
        if (typeof title !== 'string') {
            return title;
        }

        return <b>{title}</b>;
    };

    return (
        <div>
            <Overlay show={Boolean(anchorEl)} target={anchorEl} rootClose onHide={onClose}>
                <Popover id={id} className={`${styles.popover}  ${className || ''}`}>
                    <Popover.Header className={`${styles.popoverHeader} ${headerClassName || ''}`}>
                        {renderPopoverHeader()}
                    </Popover.Header>
                    <Popover.Body className={bodyClassname}>{children}</Popover.Body>
                </Popover>
            </Overlay>
        </div>
    );
};

export default CustomPopover;
