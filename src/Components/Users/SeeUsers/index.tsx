import React, { useState } from 'react';

import CardContainer from '../../CardContainer';
import TabComponentLoader from '../../Custom/CustomLoadingItems/TabComponentLoader';

const SeeUsers = () => {
    const [isLoadingExpenseData, setIsLoadingExpenseData] = useState(false);

    return (
        <div>
            {isLoadingExpenseData && <TabComponentLoader />}
            <CardContainer title="See Users" />
        </div>
    );
};

export default SeeUsers;
