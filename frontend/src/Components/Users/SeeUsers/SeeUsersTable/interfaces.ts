import { UserType } from '../../../../Types/Users';

export type SeeUsersTableProps = {
    users: UserType[];
    totalUsers: number;
    loadTableData?: (filters: any) => Promise<void>;
};
