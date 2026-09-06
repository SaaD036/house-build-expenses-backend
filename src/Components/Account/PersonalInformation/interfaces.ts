import { AccountUserType } from '../../../Types/Users';

export type PersonalInformationPropsType = {
    getLoggedInUser: () => Promise<void>;
    accountUser?: AccountUserType | null;
};
