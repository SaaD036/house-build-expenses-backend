import { FETCH_HOUSE_LIST } from '../types/houses';

import { HouseReducerStateType } from './reducerDataType';

const initialState: HouseReducerStateType = {
    houseList: null,
    houseCount: null,
};

const reducer = (
    state = initialState,
    action: { type: string; payload: Partial<HouseReducerStateType> }
) => {
    if (action.type === FETCH_HOUSE_LIST) {
        const { houseList, houseCount } = action.payload;

        return {
            ...state,
            houseList,
            houseCount,
        };
    }

    return state;
};

export default reducer;
