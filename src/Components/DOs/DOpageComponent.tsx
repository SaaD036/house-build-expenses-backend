import React from 'react';

import SeeDOs from './SeeDOs';

import { getUserFromToken } from '../../Utilities/Users/UserToken';

import { DOpageComponentPropsType } from './interfaces';
import { DO_PAGE_TABS_VALUES } from '../../Pages/DOs/constants';

const DOpageComponent = (props: DOpageComponentPropsType) => {
    const { tabName } = props;
    const loggedInUser = getUserFromToken();

    const renderTabComponents = () => {
        if (tabName === DO_PAGE_TABS_VALUES.SEE_DO) {
            return <SeeDOs />;
        }

        // if (tabName === DO_PAGE_TABS_VALUES.CREATE_DO) {
        //     return (
        //         <CreateDo
        //             disabledForm={get(loggedInUser, 'role', UserRole.USER) !== UserRole.ADMIN}
        //         />
        //     );
        // }

        return <div>Page not found</div>;
    };

    return <div className="tabComponentWrapper">{renderTabComponents()}</div>;
};

export default DOpageComponent;
