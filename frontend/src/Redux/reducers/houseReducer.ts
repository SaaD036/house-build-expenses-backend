import { FETCH_HOUSE_DETAILS, FETCH_HOUSE_DETAILS_ERROR, FETCH_HOUSE_LIST } from '../types/houses';

import { HouseReducerStateType } from './reducerDataType';

const initialState: HouseReducerStateType = {
    house: null,
    houseList: null,
    houseCount: null,
    houseLastFetchTime: null,
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

    if (action.type === FETCH_HOUSE_DETAILS) {
        const { house } = action.payload;

        return {
            ...state,
            house,
            houseLastFetchTime: new Date(),
        };
    }

    if (action.type === FETCH_HOUSE_DETAILS_ERROR) {
        return {
            ...state,
            house: null,
            houseLastFetchTime: new Date(),
        };
    }

    return state;
};

export default reducer;
