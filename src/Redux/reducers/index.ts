import { combineReducers } from 'redux';

import generalReducer from './generalReducers';
import authReducer from './authReducer';
import expenseReducer from './expenseReducer';

export default combineReducers({
    general: generalReducer,
    auth: authReducer,
    expense: expenseReducer,
});
