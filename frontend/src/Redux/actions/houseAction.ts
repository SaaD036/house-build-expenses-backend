import { Dispatch } from 'react';
import { Method } from 'axios';
import { get } from 'lodash';

import { callAxiosAPI } from '../apiServices/calAPPI';
import { buildURL } from '../apiServices/buildURL';
import { initiateToast } from '../../Components/Custom/CustomToast';

import { FETCH_HOUSE_LIST } from '../types/houses';

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
                (h: any): HouseType => ({
                    id: h.id,
                    createdAt: new Date(h.createdAt),
                    updatedAt: new Date(h.updatedAt),
                    name: h.name,
                    slug: h.slug,
                    address: {
                        area: h.address.area,
                        upazilla: h.address.upazilla,
                        district: h.address.district,
                        addressLine: h.address.address_line,
                    },
                    floorCount: h.floorCount,
                    isApproved: h.isApproved,
                    owner: h.owner,
                })
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
