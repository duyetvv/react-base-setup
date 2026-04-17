/**
 * @file This file configures and exports a centralized Axios instance for all API communications.
 *
 * It includes:
 *  - A pre-configured Axios instance with a base URL and timeout.
 *  - A request interceptor to automatically inject authentication tokens.
 *  - A response interceptor to standardize error handling and shape all API errors
 *    into a consistent `ApiErrorResponse` format.
 *  - Type-safe wrapper functions (httpGet, httpPost, etc.) for making API calls.
 */

import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import type {
  IHttpError,
  IHttpResponse,
  ISuccessResponse,
  THttpCaller,
} from "./types";
// --- Axios Instance Configuration ---

/**
 * Creates a pre-configured Axios instance.
 *
 * @remarks
 * In a real-world application, the `baseURL` should be loaded from
 * environment variables (`import.meta.env.VITE_API_BASE_URL`) to support
 * different environments (development, staging, production).
 */
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000, // 30-second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Extracts a user-friendly error message from various API error response formats.
 *
 * @param data - The error response data from the API
 * @returns A descriptive error message string
 *
 * @remarks
 * Checks for common error message fields in order:
 * 1. If data is a string, returns it directly
 * 2. If data.message exists, returns it
 * 3. If data.error exists, returns it
 * 4. If data.detail exists, returns it
 * 5. Falls back to a generic error message
 */
const extractErrorMessage = (data: unknown): string => {
  if (!data) return "An error occurred";

  // Check for common error message fields
  const errorData = data as Record<string, unknown>;
  if (typeof data === "string") return data as string;
  if (typeof errorData.message === "string") return errorData.message;
  if (typeof errorData.error === "string") return errorData.error;
  if (typeof errorData.detail === "string") return errorData.detail;

  return "An error occurred";
};

/**
 * Transforms an Axios error (or any error) into a standardized IHttpError response.
 *
 * Handles three cases:
 * 1. AxiosError with response: Server returned error status
 * 2. AxiosError without response: Request made but no response received (network error)
 * 3. Unknown error: Caught by the outer catch block
 *
 * @param error - The Axios error or unknown error to transform
 * @returns A standardized IHttpError object
 */
const transformError = (error: unknown): IHttpError => {
  const finalError = {
    success: false,
    statusCode: 500,
    statusText: "Internal Error",
    message:
      error instanceof Error ? error.message : "An unknown error occurred",
    code: "UNKNOWN_ERROR",
    timestamp: new Date().toISOString(),
  };

  if (!axios.isAxiosError(error)) {
    // Unknown error
    return finalError;
  }

  const axiosError = error as AxiosError<unknown>;

  if (axiosError.response) {
    // Server responded with error status
    return {
      success: false,
      statusCode: axiosError.response.status,
      statusText: axiosError.response.statusText,
      message: extractErrorMessage(axiosError.response.data),
      code: axiosError.code,
      details: axiosError.response.data as Record<string, unknown>,
      timestamp: new Date().toISOString(),
      path: axiosError.config?.url,
    };
  }

  if (axiosError.request) {
    // Request made but no response
    return {
      success: false,
      statusCode: 503,
      statusText: "No Response",
      message: "No response received from server",
      code: "NETWORK_ERROR",
      details: { originalError: axiosError.message },
      timestamp: new Date().toISOString(),
      path: axiosError.config?.url,
    };
  }

  return {
    ...finalError,
    path: axiosError.config?.url,
  };
};

/**
 * Transforms a successful Axios response into a standardized ISuccessResponse.
 *
 * @template T - The type of data in the response
 * @param response - The Axios response to transform
 * @returns A standardized ISuccessResponse<T> object
 */
const transformSuccess = <T>(
  response: AxiosResponse<T>,
): ISuccessResponse<T> => ({
  success: true,
  statusCode: response.status,
  statusText: response.statusText,
  data: response.data,
  headers: response.headers as Record<string, string>,
  timestamp: new Date().toISOString(),
  path: response.config.url,
});

//#region Interceptors
// --- Interceptors ---

/**
 * Request Interceptor
 *
 * @description
 * This interceptor runs before each request is sent. Its primary purpose is to
 * inject the authentication token into the request headers.
 *
 * @remarks
 * This is a common pattern for APIs that require authentication for most or all endpoints.
 * The token is retrieved from a source like localStorage, which is a common practice
 * for storing JWTs in client-side applications.
 */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Attach requestId for tracing
    config.headers["x-request-id"] = crypto.randomUUID();

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/**
 * Response Interceptor
 *
 * @description
 * This interceptor processes all responses (both successful and failed).
 * Its main job is to standardize the error format, ensuring that any error
 * thrown by an API call will have a consistent `ApiErrorResponse` shape.
 *
 * @remarks
 * - Success responses pass through unchanged
 * - Error responses are rejected with the error object
 * - The actual response/error transformation happens in the HTTP method wrappers
 *   (transformSuccess/transformError) to maintain flexibility per request type
 */
instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError): Promise<never> => Promise.reject(error),
);

//#endregion

//#region HTTP Method Wrappers

/**
 * Performs an HTTP GET request with optional query parameters.
 *
 * @template TResponseType - The expected type of the response data
 * @template TArgType - The type of query parameters
 *
 * @param {string} url - The API endpoint URL (will be appended to baseURL)
 * @param {TArgType} [reqParams] - Optional query parameters as an object
 *
 * @returns {Promise<IHttpResponse<TResponseType>>}
 * A promise resolving to either ISuccessResponse<TResponseType> or IHttpError
 *
 * @example
 * ```
 * const response = await httpGet<User, { id: string }>('/users/:id', { id: '123' });
 * if (response.success) {
 *   console.log(response.data);
 * }
 * ```
 */
export const httpGet: THttpCaller = async <TResponseType, TArgType>(
  url: string,
  reqParams?: TArgType,
): Promise<IHttpResponse<TResponseType>> => {
  try {
    const queryParams = new URLSearchParams(reqParams || {});
    const response = await instance.get<TResponseType>(url, {
      params: queryParams,
    });

    return transformSuccess(response);
  } catch (error) {
    return transformError(error);
  }
};

/**
 * Performs an HTTP POST request with a request body.
 *
 * @template TResponseType - The expected type of the response data
 * @template TArgType - The type of the request body data
 *
 * @param {string} url - The API endpoint URL (will be appended to baseURL)
 * @param {TArgType} [reqBody] - Optional request body data
 *
 * @returns {Promise<IHttpResponse<TResponseType>>}
 * A promise resolving to either ISuccessResponse<TResponseType> or IHttpError
 *
 * @example
 * ```
 * const response = await httpPost<User, CreateUserDTO>('/users', userData);
 * if (response.success) {
 *   console.log(response.data);
 * }
 * ```
 */
export const httpPost: THttpCaller = async <TResponseType, TArgType>(
  url: string,
  reqBody?: TArgType,
): Promise<IHttpResponse<TResponseType>> => {
  try {
    const response = await instance.post<TResponseType>(url, reqBody);
    return transformSuccess(response);
  } catch (error) {
    return transformError(error);
  }
};

/**
 * Performs an HTTP PUT request with a request body.
 * Used to replace entire resources on the server.
 *
 * @template TResponseType - The expected type of the response data
 * @template TArgType - The type of the request body data
 *
 * @param {string} url - The API endpoint URL (will be appended to baseURL)
 * @param {TArgType} [reqBody] - Optional request body data
 *
 * @returns {Promise<IHttpResponse<TResponseType>>}
 * A promise resolving to either ISuccessResponse<TResponseType> or IHttpError
 *
 * @example
 * ```
 * const response = await httpPut<User, UpdateUserDTO>('/users/123', updatedData);
 * ```
 */
export const httpPut: THttpCaller = async <TResponseType, TArgType>(
  url: string,
  reqBody?: TArgType,
): Promise<IHttpResponse<TResponseType>> => {
  try {
    const response = await instance.post<TResponseType>(url, reqBody);
    return transformSuccess(response);
  } catch (error) {
    return transformError(error);
  }
};

/**
 * Performs an HTTP DELETE request with optional query parameters.
 *
 * @template TResponseType - The expected type of the response data
 * @template TArgType - The type of query parameters
 *
 * @param {string} url - The API endpoint URL (will be appended to baseURL)
 * @param {TArgType} [reqParams] - Optional query parameters
 *
 * @returns {Promise<IHttpResponse<TResponseType>>}
 * A promise resolving to either ISuccessResponse<TResponseType> or IHttpError
 *
 * @example
 * ```
 * const response = await httpDelete<void, { id: string }>('/users/:id', { id: '123' });
 * ```
 */
export const httpDelete: THttpCaller = async <TResponseType, TArgType>(
  url: string,
  reqParams?: TArgType,
): Promise<IHttpResponse<TResponseType>> => {
  try {
    const queryParams = new URLSearchParams(reqParams || {});
    const response = await instance.delete<TResponseType>(url, {
      params: queryParams,
    });
    return transformSuccess(response);
  } catch (error) {
    return transformError(error);
  }
};
//#endregion

/**
 * Type guard to check if the API response is an error response.
 * Discriminates between ISuccessResponse and IHttpError by checking for the presence of 'message' without 'data'.
 *
 * @param response - The API response to check
 * @returns true if the response is an IHttpError, false otherwise
 *
 * @example
 * if (isHttpError(response)) {
 *   console.error(response.message);
 * }
 */
export const isHttpError = (
  response: IHttpResponse<unknown>,
): response is IHttpError => {
  return "message" in response && !("data" in response);
};

/**
 * Type guard to check if the API response is a success response.
 * Narrows the type to ISuccessResponse<T> by verifying the presence of the 'data' field.
 *
 * @template T The type of data in the success response
 * @param response - The API response to check
 * @returns true if the response is an ISuccessResponse<T>, false otherwise
 *
 * @example
 * if (isSuccessResponse(response)) {
 *   console.log(response.data); // Type is now known to be T
 * }
 */
export const isSuccessResponse = <T>(
  response: IHttpResponse<T>,
): response is ISuccessResponse<T> => {
  return "data" in response;
};

/**
 * Default HTTP methods export
 * Use this object to make type-safe API calls throughout the application
 *
 * @example
 * ```
 * import httpClient from '@/services/api/apiService';
 *
 * const response = await httpClient.get<User>('/users/123');
 * const created = await httpClient.post<User, CreateUserDTO>('/users', data);
 * const updated = await httpClient.put<User, UpdateUserDTO>('/users/123', data);
 * const deleted = await httpClient.delete<void>('/users/123');
 * ```
 */
export default {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  delete: httpDelete,
};
