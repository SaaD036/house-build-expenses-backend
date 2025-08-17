import { GET_ALL_USERS } from '../types/users';

import { UserReducerStateType } from './reducerDataType';

const initialState: UserReducerStateType = {
    users: null,
    totalUsers: null,
};

const reducer = (
    state = initialState,
    action: { type: string; payload: Partial<UserReducerStateType> }
) => {
    if (action.type === GET_ALL_USERS) {
        return {
            ...state,
            users: action.payload.users,
            totalUsers: action.payload.totalUsers,
        };
    }

    return state;
};

export default reducer;
