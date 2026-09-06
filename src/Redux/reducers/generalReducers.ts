import { CURRENT_VIEW } from '../types/general';

import { GeneralReducerStateType } from './reducerDataType';

const initialState: GeneralReducerStateType = {
    currentView: null,
};

const reducer = (state = initialState, action: { type: string; payload: any }) => {
    if (action.type === CURRENT_VIEW) {
        return {
            ...state,
            currentView: action.payload,
        };
    }

    return state;
};

export default reducer;
