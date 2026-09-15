import { IconTypes } from '../../../Types/IconsAndImages';
import { CustomTableFilterItemType, CustomTableFilterFormDataType } from './interfaces';

export const createActionColumnMenuItem = (
    key: string,
    label: string,
    Icon: IconTypes,
    onClick: () => void,
    isDisabled?: boolean
) => {
    return { key, label, Icon, onClick, isDisabled };
};

export const getTableFilterFormInitialData = (filterItems: CustomTableFilterItemType[]) => {
    let tableFilterFormInitialData: CustomTableFilterFormDataType = {};

    filterItems.forEach((item) => {
        tableFilterFormInitialData = {
            ...tableFilterFormInitialData,
            [item.key]: null,
        };
    });

    return tableFilterFormInitialData;
};
