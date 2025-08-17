import React, { ReactNode } from 'react';

import CardContainer from '..';
import ButtonsToSwitchViews from '../../Custom/CustomButton/ButtonsToSwitchViews';

import styles from '../styles.module.css';

const SwitchViewButtonSectionContainer = ({ title }: { title?: string | ReactNode }) => {
    const renderSwitchViewButtonContainer = () => {
        return (
            <div className={styles.switchViewButtonContainer}>
                {title ? title : <></>}
                <ButtonsToSwitchViews />
            </div>
        );
    };

    return <CardContainer title={renderSwitchViewButtonContainer()} />;
};

export default SwitchViewButtonSectionContainer;
