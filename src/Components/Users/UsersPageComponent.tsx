import React from 'react';

import SeeUsers from './SeeUsers';

import { USERS_PAGE_TABS_VALUES } from '../../Pages/Users/constants';

import { UsersPagePropType } from './interfaces';

const UsersPageComponent = (props: UsersPagePropType) => {
    const { tabName } = props;

    const renderTabComponents = () => {
        if (tabName === USERS_PAGE_TABS_VALUES.SEE_USERS) {
            return <SeeUsers />;
        }

        if (tabName === USERS_PAGE_TABS_VALUES.CREATE_USER) {
            return 'Create User';
        }

        return <div>Page not found</div>;
    };

    return <div className="tabComponentWrapper">{renderTabComponents()}</div>;
};

export default UsersPageComponent;
