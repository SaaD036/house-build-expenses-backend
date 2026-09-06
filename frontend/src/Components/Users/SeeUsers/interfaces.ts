import { CurrentViewType } from '../../../Types';
import { UserType } from '../../../Types/Users';

export type SeeUsersPropsType = {
    currentView: CurrentViewType | null;
    users: UserType[] | null;
    totalUsers: number | null;
    getAllUsers: (filters: any) => Promise<void>;
};
