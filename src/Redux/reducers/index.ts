import { combineReducers } from 'redux';

import generalReducer from './generalReducers';
import authReducer from './authReducer';
import expenseReducer from './expenseReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    general: generalReducer,
    auth: authReducer,
    expense: expenseReducer,
    user: userReducer,
});

export type ReducerStateType = ReturnType<typeof rootReducer>;
export default rootReducer;
