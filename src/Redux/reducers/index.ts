import { combineReducers } from 'redux';

import generalReducer from './generalReducers';
import authReducer from './authReducer';
import expenseReducer from './expenseReducer';
import userReducer from './userReducer';

export default combineReducers({
    general: generalReducer,
    auth: authReducer,
    expense: expenseReducer,
    user: userReducer,
});
