import { GET_ALL_USERS, GET_ACCOUNT_USER } from '../types/users';

import { UserReducerStateType } from './reducerDataType';

const initialState: UserReducerStateType = {
    users: null,
    totalUsers: null,
    accountUser: null,
};

const reducer = (
    state = initialState,
    action: { type: string; payload: Partial<UserReducerStateType> }
) => {
    const { type, payload } = action;

    if (type === GET_ALL_USERS) {
        return {
            ...state,
            users: payload.users,
            totalUsers: payload.totalUsers,
        };
    }

    if (type === GET_ACCOUNT_USER) {
        return {
            ...state,
            accountUser: payload.accountUser,
        };
    }

    return state;
};

export default reducer;
