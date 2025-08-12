import React, { ReactNode } from 'react';

import CardContainer from '..';
import ButtonsToSwitchViews from '../../Custom/CustomButton/ButtonsToSwitchViews';

const SwitchViewButtonSectionContainer = ({ title }: { title?: string | ReactNode }) => {
    const renderSwitchViewButtonContainer = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                {title ? title : <></>}
                <ButtonsToSwitchViews />
            </div>
        );
    };

    return <CardContainer title={renderSwitchViewButtonContainer()} />;
};

export default SwitchViewButtonSectionContainer;
