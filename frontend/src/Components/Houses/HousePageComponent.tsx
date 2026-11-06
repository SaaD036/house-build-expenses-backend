import React from 'react';

import SeeHouses from './SeeHouses';

import { HOUSES_PAGE_TABS_VALUES } from '../../Pages/Houses/constants';
import { HousePageComponentPropsType } from './interfaces';

const HousePageComponent = (props: HousePageComponentPropsType) => {
    const { tabName } = props;

    const renderTabComponents = () => {
        if (tabName === HOUSES_PAGE_TABS_VALUES.YOUR_HOUSES) {
            return <SeeHouses houseTypes="your_created" />;
        }

        if (tabName === HOUSES_PAGE_TABS_VALUES.SHARED_HOUSES) {
            return <SeeHouses houseTypes="shared" />;
        }

        if (tabName === HOUSES_PAGE_TABS_VALUES.CREATE_HOUSE) {
            return <div>Create House Tab</div>;
        }

        return <div>Page not found</div>;
    };

    return <div className="tabComponentWrapper">{renderTabComponents()}</div>;
};

export default HousePageComponent;
