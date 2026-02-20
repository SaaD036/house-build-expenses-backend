/* eslint-disable indent */
import { Dispatch } from 'react';
import { Method } from 'axios';

import { initiateToast } from '../../Components/Custom/CustomToast';

import { buildURL } from '../apiServices/buildURL';
import { callAxiosAPI } from '../apiServices/calAPPI';

import ValidationError from '../../ErrorHandlers/ValidationError';

import { GET_ALL_DOS } from '../types/dos';

import { DOreducerType } from '../reducers/reducerDataType';

import doAPIs from '../apiServices/APIs/doAPIs.json';
import { HTTP_STATUS_CODE } from '../../Constants/HTTP';
import { get, isArray } from 'lodash';
import { DO } from '../../Types/DOs';
import { CreateDOformValueType } from '../../Components/DOs/CreateDO/interfaces';

type DispatchType = { type: string; payload: Partial<DOreducerType> };

export const getAllDOs = (filters: any) => async (dispatch: Dispatch<DispatchType>) => {
    try {
        const { path, method } = doAPIs.GET_ALL_DOS;
        const { UNAUTHENTICATED, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODE;
        const params: any = {};

        const URLwithVarsANDparams = buildURL(path, {}, params);
        const { status, data } = await callAxiosAPI({
            url: URLwithVarsANDparams,
            method: method as Method,
        });

        if (status === UNAUTHENTICATED) {
            throw new ValidationError('User does not have access to DOs');
        } else if (status === INTERNAL_SERVER_ERROR) {
            throw new ValidationError('Can not fetch DOs');
        }

        const dos: DO[] = get(data, 'do', []).map((value: any) => ({
            amount: Number(value.amount),
            createdAt: new Date(value.createdAt),
            creator: {
                id: value.creator.id,
                firstName: value.creator.firstName,
                lastName: value.creator.lastName,
            },
            description: value.description,
            doDate: new Date(value.doDate),
            doEditHistory: value.doEditHistory,
            doItem: value.doItem,
            id: value.id,
            imageURL: value.imageURL,
            shopAddress: {
                area: value.shopAddress.area,
                ward: value.shopAddress.ward,
                upazilla: value.shopAddress.upazilla,
                district: value.shopAddress.district,
            },
            shopName: value.shopName,
        }));

        dispatch({
            type: GET_ALL_DOS,
            payload: {
                dos,
                doCount: 1000,
            },
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

export const createDo =
    (doData: CreateDOformValueType) => async (dispatch: Dispatch<DispatchType>) => {
        try {
            const { path, method } = doAPIs.CREATE_DO;
            const { BAD_REQUEST, UNAUTHENTICATED } = HTTP_STATUS_CODE;

            const doDataForPayload = {
                shopName: doData.shopname,
                shopAddress: {
                    area: doData.area,
                    ward: doData.ward,
                    upazilla: doData.upazilla,
                    district: doData.district,
                },
                doItem: doData.doItem,
                description: doData.description,
                amount: doData.amount,
                doDate: doData.doDate?.toISOString(),
            };

            const { status, data } = await callAxiosAPI({
                url: buildURL(path),
                method: method as Method,
                data: doDataForPayload,
            });

            if (status === UNAUTHENTICATED) {
                throw new ValidationError('User does not have access to DOs');
            } else if (status === BAD_REQUEST) {
                const errorMessage = get(data, 'error.message', null);

                if (typeof errorMessage === 'string') {
                    throw new ValidationError(errorMessage);
                }

                if (isArray(errorMessage) && errorMessage.length > 0) {
                    throw new ValidationError(errorMessage[0]);
                }

                throw new ValidationError('Can not add DOs');
            } else if (status > 299) {
                throw new ValidationError('Can not add DOs');
            }

            initiateToast({
                type: 'success',
                message: 'DO added successfully',
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
