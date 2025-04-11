import { useState, useCallback } from "react";
import type { ActionTypeMap } from "../../types/types";

/**
 * Base response interface for all action responses
 */
interface BaseResponse {
  status: "success" | "error";
}

/**
 * Success response with data
 */
interface SuccessResponse<T> extends BaseResponse {
  status: "success";
  result: T;
}

/**
 * Error response with message
 */
interface ErrorResponse extends BaseResponse {
  status: "error";
  error: string;
}

/**
 * Combined response type
 */
export type ActionResponse<T> = SuccessResponse<T> | ErrorResponse;

/**
 * Options for action calls
 */
export interface ActionOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

/**
 * Typed createAction using ActionTypeMap
 */
export function createAction<Path extends keyof ActionTypeMap>(
  actionPath: Path
): (
  input: ActionTypeMap[Path]["input"],
  options?: ActionOptions
) => Promise<ActionResponse<ActionTypeMap[Path]["output"]>>;

/**
 * Generic fallback createAction if you need to specify manually
 */
export function createAction<TInput, TOutput>(
  actionPath: string
): (input: TInput, options?: ActionOptions) => Promise<ActionResponse<TOutput>>;

export function createAction(actionPath: string) {
  return createActionCaller(actionPath);
}

/**
 * Create a typed action caller function (doesn't use hooks, can be used outside components)
 */
const createActionCaller = <TInput, TOutput>(actionPath: string) => {
  return async (
    input: TInput,
    options: ActionOptions = {}
  ): Promise<ActionResponse<TOutput>> => {
    try {
      const controller = new AbortController();
      let timeoutId: number | undefined;

      if (options.timeout) {
        timeoutId = window.setTimeout(
          () => controller.abort(),
          options.timeout
        );
      }

      const response = await fetch(`/_actions/${actionPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(input),
        signal: controller.signal,
      });

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        throw new Error(
          `HTTP error ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.status === "success") {
        return data as SuccessResponse<TOutput>;
      } else if (data.status === "error") {
        return data as ErrorResponse;
      } else {
        return {
          status: "success",
          result: data.result,
        } as SuccessResponse<TOutput>;
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          status: "error",
          error: error.message,
        };
      }
      return {
        status: "error",
        error: "Unknown error occurred",
      };
    }
  };
};

/**
 * Hook for using server actions in React components
 */
export function useAction<Path extends keyof ActionTypeMap>(
  actionPath: Path,
  defaultOptions: ActionOptions
): (
  input: ActionTypeMap[Path]["input"],
  options?: ActionOptions
) => Promise<ActionResponse<ActionTypeMap[Path]["output"]>>;

export function useAction<TInput, TOutput>(
  actionPath: string,
  defaultOptions: ActionOptions
): (input: TInput, options?: ActionOptions) => Promise<ActionResponse<TOutput>>;

export function useAction(
  actionPath: string,
  defaultOptions: ActionOptions = {}
) {
  const actionFn = useCallback(
    async (input: unknown, options: ActionOptions = {}) => {
      const mergedOptions = { ...defaultOptions, ...options };
      const caller = createActionCaller(actionPath);
      return await caller(input, mergedOptions);
    },
    [actionPath, defaultOptions]
  );

  return actionFn;
}

/**
 * Hook for using server actions with loading state
 */
export function useActionWithState<Path extends keyof ActionTypeMap>(
  actionPath: Path,
  defaultOptions: ActionOptions = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const actionFn = useAction(actionPath, defaultOptions);

  const actionWithState = useCallback(
    async (
      input: ActionTypeMap[Path]["input"],
      options: ActionOptions = {}
    ) => {
      setLoading(true);
      setError(null);

      try {
        const result = await actionFn(input, options);
        if (result.status === "error") {
          setError(result.error);
        }
        return result;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        return {
          status: "error",
          error: errorMessage,
        } as ErrorResponse;
      } finally {
        setLoading(false);
      }
    },
    [actionFn]
  );

  return [actionWithState, loading, error] as const;
}
