/* eslint-disable indent */
import { Dispatch } from 'react';
import { Method } from 'axios';
import { get } from 'lodash';

import { buildURL } from '../apiServices/buildURL';
import { callAxiosAPI } from '../apiServices/calAPPI';
import { initiateToast } from '../../Components/Custom/CustomToast';

import ValidationError from '../../ErrorHandlers/ValidationError';

import { GET_ALL_USERS } from '../types/users';

import userAPIs from '../apiServices/APIs/userAPIs.json';
import { HTTP_STATUS_CODE } from '../../Constants/HTTP';
import { UserRole } from '../../Constants/Users';

import { UserAccountEditHistoryType, UserType } from '../../Types/Users';
import { UserReducerStateType } from '../reducers/reducerDataType';
import { CreateUserFormDataType } from '../../Components/Users/CreateUser/interfaces';

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
            throw new ValidationError('User does not have access to users');
        } else if (status === INTERNAL_SERVER_ERROR) {
            throw new ValidationError('Can not fetch users');
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
            initiateToast({
                type: 'error',
                message: error.message.toString(),
            });
        }
    }
};

export const createUser =
    (userData: CreateUserFormDataType) => async (dispatch: Dispatch<DispatchType>) => {
        try {
            const { path, method } = userAPIs.CREATE_USER;
            const { UNAUTHENTICATED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = HTTP_STATUS_CODE;

            const URLwithVarsANDparams = buildURL(path);
            const { data, status } = await callAxiosAPI({
                url: URLwithVarsANDparams,
                method: method as Method,
                data: userData,
            });

            if (status === UNAUTHENTICATED) {
                throw new ValidationError('User is not allowed to create new user');
            } else if (status === BAD_REQUEST) {
                throw new ValidationError(get(data, 'error.message', 'Can not create user'));
            } else if (status === INTERNAL_SERVER_ERROR) {
                throw new ValidationError('Can not create user');
            }

            initiateToast({ type: 'success', message: 'User created' });
        } catch (error) {
            if (error instanceof Error) {
                initiateToast({
                    type: 'error',
                    message: error.message.toString(),
                });
            }
        }
    };
