import { combineReducers } from 'redux';

import authReducer from './authReducer';
import expenseReducer from './expenseReducer';

export default combineReducers({
    auth: authReducer,
    expense: expenseReducer,
});
