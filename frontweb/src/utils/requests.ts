import axios, { AxiosRequestConfig } from 'axios';

const baseURL = 'http://localhost:8080';

export const makeRequest = axios.create({
    baseURL
});

export const requestBackend = (config: AxiosRequestConfig) => {
    const headers = config.withCredentials ? {
        ...config.headers,
    } : config.headers;

    return axios({ ...config, baseURL: baseURL, headers });
}
