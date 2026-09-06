import React from 'react';
import { get } from 'lodash';

import SeeUsers from './SeeUsers';
import CreateUser from './CreateUser';

import { getUserFromToken } from '../../Utilities/Users/UserToken';

import { UserRole } from '../../Constants/Users';
import { USERS_PAGE_TABS_VALUES } from '../../Pages/Users/constants';

import { UsersPagePropType } from './interfaces';

const UsersPageComponent = (props: UsersPagePropType) => {
    const { tabName } = props;
    const loggedInUser = getUserFromToken();

    const renderTabComponents = () => {
        if (tabName === USERS_PAGE_TABS_VALUES.SEE_USERS) {
            return <SeeUsers />;
        }

        if (tabName === USERS_PAGE_TABS_VALUES.CREATE_USER) {
            return (
                <CreateUser
                    disabledForm={get(loggedInUser, 'role', UserRole.USER) !== UserRole.ADMIN}
                />
            );
        }

        return <div>Page not found</div>;
    };

    return <div className="tabComponentWrapper">{renderTabComponents()}</div>;
};

export default UsersPageComponent;
