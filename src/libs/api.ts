import { API_BASEURL } from "@/constants";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

const axiosInstance = axios.create({
    baseURL: API_BASEURL,
    withCredentials: true,
    validateStatus: (status) => status <= 500,
});

function getTokenFromCookie(): string | null {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
}

axiosInstance.interceptors.request.use((config) => {
    const token = getTokenFromCookie();
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const request = async <T, P = undefined>(method: Method, endpoint: string, payload?: P, params?: object): Promise<{ code: number, data: T }> => {
    const config: AxiosRequestConfig = { method, params };
    if (payload) config.data = payload;

    config.url = endpoint;

    try {
        const response: AxiosResponse<T> = await axiosInstance(config);
        return { code: response.status, data: response.data };
    } catch (e: any) {
        throw e;
    }
};

export const api = {
    get: <T>(endpoint: string, params?: object) => request<T>("GET", endpoint, undefined, params),
    post: <T, P>(endpoint: string, payload: P) => request<T, P>("POST", endpoint, payload),
    delete: <T>(endpoint: string) => request<T>("DELETE", endpoint),
    patch: <T, P>(endpoint: string, payload: P) => request<T, P>("PATCH", endpoint, payload)
};
