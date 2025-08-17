import { CurrentViewType } from '../../../Types';

export type SeeUsersPropsType = {
    currentView: CurrentViewType | null;
    getAllUsers: (filters: any) => Promise<void>;
};
