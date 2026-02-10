import React from 'react';

import { ACCOUNT_PAGE_TABS_VALUES } from '../../Pages/Account/constants';

import { AccountPageComponentPropsType } from './interfaces';

const AccountPageComponent = (props: AccountPageComponentPropsType) => {
    const { tabName } = props;

    const renderTabComponents = () => {
        if (tabName === ACCOUNT_PAGE_TABS_VALUES.PERSONAL_INFO) {
            return <div>Personal Info tab</div>;
        }

        if (tabName === ACCOUNT_PAGE_TABS_VALUES.EXPENSES) {
            return <div>Expenses tab</div>;
        }

        if (tabName === ACCOUNT_PAGE_TABS_VALUES.ALBUMS) {
            return <div>Albums tab</div>;
        }

        if (tabName === ACCOUNT_PAGE_TABS_VALUES.SETTINGS) {
            return <div>Settings tab</div>;
        }

        return <div>Page not found</div>;
    };

    return <div className="tabComponentWrapper">{renderTabComponents()}</div>;
};

export default AccountPageComponent;
