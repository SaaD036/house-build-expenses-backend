/* eslint-disable indent */
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { Method } from 'axios';
// import { get, isArray } from 'lodash';

import { buildURL } from '../apiServices/buildURL';
import { callAxiosAPI } from '../apiServices/calAPPI';

import ValidationError from '../../ErrorHandlers/ValidationError';

import { GET_ALL_USERS } from '../types/users';

import userAPIs from '../apiServices/APIs/userAPIs.json';
import { HTTP_STATUS_CODE } from '../../Constants/HTTP';

type DispatchType = { type: string; payload: any };

export const getAllUsers = (filters: any) => async (dispatch: Dispatch<DispatchType>) => {
    try {
        const { path, method } = userAPIs.GET_ALL_USERS;
        const { UNAUTHENTICATED, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODE;
        const params: any = {};

        const URLwithVarsANDparams = buildURL(path, {}, params);
        const { status, data } = await callAxiosAPI({
            url: URLwithVarsANDparams,
            method: method as Method,
        });

        if (status === UNAUTHENTICATED) {
            throw new ValidationError('User does not have access to expenses');
        } else if (status === INTERNAL_SERVER_ERROR) {
            throw new ValidationError('Can not fetch expenses');
        }

        dispatch({
            type: GET_ALL_USERS,
            payload: null,
        });
    } catch (error) {
        if (error instanceof Error) {
            toast(error.message.toString());
        }
    }
};
