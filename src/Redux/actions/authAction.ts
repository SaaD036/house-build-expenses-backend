/* eslint-disable indent */
import { Dispatch } from 'react';
import { Method } from 'axios';

import { callAxiosAPIWithoutUserCredential } from '../apiServices/calAPPI';
import { buildURL } from '../apiServices/buildURL';
import authAPIs from '../apiServices/APIs/authAPIs.json';

import { setCookie } from '../../Utilities/Cookies';
import { initiateToast } from '../../Components/Custom/CustomToast';

import { LOG_IN } from '../types/auth';

import { cookieName } from '../../Utilities/Cookies';
import { HTTP_STATUS_CODE } from '../../Constants/HTTP';
import ValidationError from '../../ErrorHandlers/ValidationError';

export const login =
    (email: string, password: string) =>
    async (dispatch: Dispatch<{ type: string; payload: any }>) => {
        try {
            const { path, method } = authAPIs.LOGIN;
            const loginResponse = await callAxiosAPIWithoutUserCredential({
                url: buildURL(path),
                method: method as Method,
                data: {
                    email,
                    password,
                },
            });

            if (loginResponse.status === HTTP_STATUS_CODE.NOT_FOUND) {
                throw new ValidationError('No user found with this credential');
            } else if (loginResponse.status === HTTP_STATUS_CODE.BAD_REQUEST) {
                throw new ValidationError('Bad request');
            } else if (loginResponse.status === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
                throw new ValidationError('Internal server error');
            }

            const { token } = loginResponse.data;

            if (typeof token === 'string') {
                setCookie(cookieName.USER_TOKEN, token);
            }

            dispatch({
                type: LOG_IN,
                payload: token,
            });

            initiateToast({
                type: 'success',
                message: 'Logged in',
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

export const setLoggedinUserToken =
    (token: string | undefined) => (dispatch: Dispatch<{ type: string; payload: any }>) => {
        dispatch({
            type: LOG_IN,
            payload: token,
        });
    };
