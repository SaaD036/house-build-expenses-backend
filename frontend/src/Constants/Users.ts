export const UserRole = {
    ADMIN: 'admin',
    USER: 'user',
    VISITOR: 'visitor',
} as const;

export const AdminRoleArray = [UserRole.ADMIN, UserRole.VISITOR];

export const UserAccountStatus = {
    ACTIVE: 'active',
    DEACTIVE: 'deactive',
    DELETED: 'deleted',
    WAITING_FOR_USER_APPROVAL: 'waiting_for_user_approval',
};
