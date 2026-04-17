/**
 * @file Contains the core type definitions for standardized API responses.
 * These models ensure that all data flowing from the API service layer has a predictable shape,
 * making it easier to handle success and error states in the UI or state management layers.
 */

export interface ServerErrorPayload {
  message?: string;
  errors?: string[];
}

type ErrorType = "SERVER" | "NETWORK" | "CLIENT" | "UNKNOWN";

/**
 * Defines the standardized shape for a failed API response.
 * This structure is returned by the apiService for any non-2xx HTTP status.
 */
export interface HttpErrorResponse {
  /** The HTTP status code of the error response. */
  statusCode: number;
  /** A general message summarizing the error (e.g., "Validation Failed"). */
  message: string;
  /** An array of detailed error objects. */
  errors: string[];

  type?: ErrorType;

  // Debugging metadata (VERY useful)
  meta?: {
    url?: string;
    method?: string;
    requestId?: string;
    timestamp: number;
  };

  // Preserve original error for debugging/logging tools
  originalError?: unknown;
}

/**
 * Represents the resolved object from a successful API call from the http-methods.
 * The interceptor passes the full AxiosResponse, but the calling function
 * will typically resolve with just the data payload.
 */
export type HttpSuccessResponse<T> = T;

/**
 * Defines the shape of a generic HTTP calling function.
 * @template ReturnedType The expected return type of the API call.
 * @template ArgType The type of the data or parameters being sent.
 */
export type HttpCaller = <ReturnedType, ArgType>(
  url: string,
  reqData: ArgType,
) => Promise<ReturnedType | unknown>;
