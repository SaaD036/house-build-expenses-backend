import { IconTypes } from '../../../Types/IconsAndImages';

export const createActionColumnMenuItem = (
    key: string,
    label: string,
    Icon: IconTypes,
    onClick: () => void
) => {
    return { key, label, Icon, onClick };
};
