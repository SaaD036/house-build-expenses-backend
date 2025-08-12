import React from 'react';

import ButtonSection from './ButtonSection';

import styles from './styles.module.css';

const ButtonsToSwitchViews = () => {
    return (
        <ButtonSection className={`center ${styles.switchViewButtonContainer}`}>
            <div className={`${styles.switchViewButtonText} ${styles.switchViewLeftButtonText}`}>
                Card View
            </div>
            <div className={`${styles.switchViewButtonText} ${styles.switchViewRightButtonText}`}>
                Table View
            </div>
        </ButtonSection>
    );
};

export default ButtonsToSwitchViews;
