/**
 * Base interface for response structure
 */
export interface BaseResponse {
  status: "success" | "error";
}

/**
 * Success response with generic result type
 */
export interface SuccessResponse<T> extends BaseResponse {
  status: "success";
  result: T;
}

/**
 * Error response with error message
 */
export interface ErrorResponse extends BaseResponse {
  status: "error";
  error: string;
}

/**
 * Union type for success or error responses
 */
export type ActionResponse<T> = SuccessResponse<T> | ErrorResponse;

/**
 * Options for action requests
 */
export interface ActionOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * Provides type mapping for actions
 * Should be extended by user application
 */
export interface ActionTypeMap {
  [key: string]: {
    input: any;
    output: any;
  };
}
