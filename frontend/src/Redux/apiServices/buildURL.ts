import React from 'react';
import { useLocation } from 'react-router-dom';

export const BASE_URL =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL;

export const buildURL = (path: string, variables: any = {}, params: any = {}): string => {
    let url = `${BASE_URL}/api${path}`;

    Object.keys(variables).forEach((key) => {
        url = url.replace(`{${key}}`, variables[key]);
    });

    Object.keys(params).forEach((key, index) => {
        url = index === 0 ? `${url}?${key}=${params[key]}` : `${url}&${key}=${params[key]}`;
    });

    return url;
};

export const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
};
