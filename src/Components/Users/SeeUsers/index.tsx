import React, { useState } from 'react';

import CardContainer from '../../CardContainer';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';
import SwitchViewButtonSectionContainer from '../../CardContainer/SwitchViewButtonSectionContainer';

const SeeUsers = () => {
    const [isLoadingExpenseData, setIsLoadingExpenseData] = useState(false);

    return (
        <div style={{ display: 'grid', gap: '20px' }}>
            {isLoadingExpenseData && <TabComponentLoader />}
            <CardContainer title="See Users" />
            <SwitchViewButtonSectionContainer title="Change View" />
        </div>
    );
};

export default SeeUsers;
