import { combineReducers } from 'redux';

import generalReducer from './generalReducers';
import authReducer from './authReducer';
import houseReducer from './houseReducer';
import expenseReducer from './expenseReducer';
import userReducer from './userReducer';
import doReducer from './doReducer';

const rootReducer = combineReducers({
    general: generalReducer,
    auth: authReducer,
    house: houseReducer,
    expense: expenseReducer,
    user: userReducer,
    do: doReducer,
});

export type ReducerStateType = ReturnType<typeof rootReducer>;
export default rootReducer;
