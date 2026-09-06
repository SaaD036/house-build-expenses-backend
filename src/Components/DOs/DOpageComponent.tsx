import React from 'react';
import { get } from 'lodash';

import SeeDOs from './SeeDOs';
import CreateDO from './CreateDO';

import { getUserFromToken } from '../../Utilities/Users/UserToken';

import { DO_PAGE_TABS_VALUES } from '../../Pages/DOs/constants';
import { UserRole } from '../../Constants/Users';

import { DOpageComponentPropsType } from './interfaces';

const DOpageComponent = (props: DOpageComponentPropsType) => {
    const { tabName } = props;
    const loggedInUser = getUserFromToken();

    const renderTabComponents = () => {
        if (tabName === DO_PAGE_TABS_VALUES.SEE_DO) {
            return <SeeDOs />;
        }

        if (tabName === DO_PAGE_TABS_VALUES.CREATE_DO) {
            return (
                <CreateDO
                    disabledForm={get(loggedInUser, 'role', UserRole.USER) !== UserRole.ADMIN}
                />
            );
        }

        return <div>Page not found</div>;
    };

    return <div className="tabComponentWrapper">{renderTabComponents()}</div>;
};

export default DOpageComponent;
