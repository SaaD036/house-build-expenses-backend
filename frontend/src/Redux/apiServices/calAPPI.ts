import axios from 'axios';

import { getCookie, cookieName } from '../../Utilities/Cookies';

import { AxiosPayloadType } from './apiServiceTypes';

export const callAxiosAPIWithoutUserCredential = async (payload: AxiosPayloadType) => {
    const response = await axios({
        validateStatus: (status_code) => true,
        ...payload,
    });

    return response;
};

export const callAxiosAPI = async (payload: AxiosPayloadType) => {
    const authToken = getCookie(cookieName.USER_TOKEN);

    const response = await axios({
        ...payload,
        validateStatus: (status_code) => true,
        headers: {
            ...payload.headers,
            Authorization: `Bearer ${authToken}`,
        },
    });

    return response;
};
