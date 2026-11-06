import { Dispatch } from 'react';
import { Method } from 'axios';
import { get } from 'lodash';

import { buildURL } from '../apiServices/buildURL';
import { callAxiosAPI } from '../apiServices/calAPPI';
import { initiateToast } from '../../Components/Custom/CustomToast';
import { prepareHouseDataFromApiResponse } from '../../Utilities/Houses/HouseApi';

import { FETCH_HOUSE_LIST, FETCH_HOUSE_DETAILS, FETCH_HOUSE_DETAILS_ERROR } from '../types/houses';

import { HTTP_STATUS_CODE } from '../../Constants/HTTP';
import houseAPIs from '../apiServices/APIs/houseAPIs.json';
import ValidationError from '../../ErrorHandlers/ValidationError';

import { HouseType } from '../../Types/Houses';
import { HouseReducerStateType } from '../reducers/reducerDataType';

type DispatchType = Dispatch<{ type: string; payload: Partial<HouseReducerStateType> }>;

export const fetchHouseList = (filters: any) => async (dispatch: DispatchType) => {
    try {
        const { path, method } = houseAPIs.FETCH_HOUSE_LIST;
        const { status, data: houseListResponse } = await callAxiosAPI({
            url: buildURL(path, {}, filters),
            method: method as Method,
        });

        if (status > HTTP_STATUS_CODE.VALID_STATUS_LIMIT) {
            throw new ValidationError('Can not fetch houses list');
        }

        const houseList: HouseType[] =
            get(houseListResponse, 'data.houses', []).map(
                (h: any): HouseType => prepareHouseDataFromApiResponse(h)
            ) ?? [];

        dispatch({
            type: FETCH_HOUSE_LIST,
            payload: { houseList, houseCount: get(houseListResponse, 'data.houseCount', 0) },
        });
    } catch (error) {
        if (error instanceof Error) {
            initiateToast({
                type: 'error',
                message: error.message.toString(),
            });
        }
    }
};

export const fetchHouseDetails = (houseSlug: string) => async (dispatch: DispatchType) => {
    try {
        const { path, method } = houseAPIs.FETCH_HOUSE_DETAILS;
        const { status, data: houseDetailsResponse } = await callAxiosAPI({
            url: buildURL(path, { houseSlug }),
            method: method as Method,
        });

        const houseDetailsResponseData = get(houseDetailsResponse, 'data.house', undefined);

        if (status > HTTP_STATUS_CODE.VALID_STATUS_LIMIT || !houseDetailsResponseData) {
            throw new ValidationError('Can not fetch house details');
        }

        const houseDetails: HouseType = prepareHouseDataFromApiResponse(
            houseDetailsResponse.data.house
        );

        dispatch({
            type: FETCH_HOUSE_DETAILS,
            payload: { house: houseDetails },
        });
    } catch (error) {
        if (error instanceof Error) {
            initiateToast({
                type: 'error',
                message: error.message.toString(),
            });
        }

        dispatch({
            type: FETCH_HOUSE_DETAILS_ERROR,
            payload: {},
        });
    }
};

export const clearHouseDetailsData = () => (dispatch: DispatchType) => {
    dispatch({
        type: FETCH_HOUSE_DETAILS_ERROR,
        payload: {},
    });
};
