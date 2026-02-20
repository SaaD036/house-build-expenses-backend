import { combineReducers } from 'redux';

import generalReducer from './generalReducers';
import authReducer from './authReducer';
import expenseReducer from './expenseReducer';
import userReducer from './userReducer';
import doReducer from './doReducer';

const rootReducer = combineReducers({
    general: generalReducer,
    auth: authReducer,
    expense: expenseReducer,
    user: userReducer,
    do: doReducer,
});

export type ReducerStateType = ReturnType<typeof rootReducer>;
export default rootReducer;
