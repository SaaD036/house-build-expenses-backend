import React from 'react';

import styles from './styles.module.css';

const CardContainer = (props: { children?: React.ReactNode; title?: string | React.ReactNode }) => {
    const { children, title } = props;

    return (
        <div className={styles.cardContainerWrapper}>
            {title && <div className={styles.cardContainerTitle}>{title}</div>}
            {children}
        </div>
    );
};

export default CardContainer;
