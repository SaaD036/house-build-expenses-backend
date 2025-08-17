/* eslint-disable indent */
import { Dispatch } from 'react';
import { toast } from 'react-toastify';
import { Method } from 'axios';
import { get } from 'lodash';

import { buildURL } from '../apiServices/buildURL';
import { callAxiosAPI } from '../apiServices/calAPPI';

import ValidationError from '../../ErrorHandlers/ValidationError';

import { GET_ALL_USERS } from '../types/users';

import userAPIs from '../apiServices/APIs/userAPIs.json';
import { HTTP_STATUS_CODE } from '../../Constants/HTTP';
import { UserRole } from '../../Constants/Users';

import { UserAccountEditHistoryType, UserType } from '../../Types/Users';
import { UserReducerStateType } from '../reducers/reducerDataType';
type DispatchType = { type: string; payload: Partial<UserReducerStateType> };

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

        const users: UserType[] = get(data, 'users', []).map((user: any) => ({
            id: user.id,
            email: user.email,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            role: user.role || UserRole.USER,
            accountStatus: user.accountStatus,
            accountEditHistory: user.accountEditHistory as UserAccountEditHistoryType,
            totalExpenseCount: isNaN(user.totalExpenseCount)
                ? undefined
                : Number(user.totalExpenseCount),
        }));

        dispatch({
            type: GET_ALL_USERS,
            payload: {
                totalUsers: get(data, 'totalUsers', 0),
                users,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            toast(error.message.toString());
        }
    }
};
