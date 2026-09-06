import { GET_ALL_DOS } from '../types/dos';

import { DOreducerType } from './reducerDataType';

const initialState: DOreducerType = {
    dos: null,
    doCount: null,
};

const reducer = (
    state = initialState,
    action: { type: string; payload: Partial<DOreducerType> }
) => {
    const { type, payload } = action;

    if (type === GET_ALL_DOS) {
        return {
            ...state,
            dos: payload.dos,
            doCount: payload.doCount,
        };
    }

    return state;
};

export default reducer;
