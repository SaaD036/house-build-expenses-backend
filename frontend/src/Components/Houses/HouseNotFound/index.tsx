import React from 'react';

import HouseIcon from '@mui/icons-material/WbShade';

import CustomNotFound from '../../Custom/CustomNotFound';

const HouseNotFound = ({ title }: { title?: string }) => {
    return <CustomNotFound Icon={HouseIcon} title={title ?? 'You have no house'} />;
};

export default HouseNotFound;
