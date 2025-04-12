import { useState, useCallback } from "react";
import type {
  ActionTypeMap,
  ActionOptions,
  ActionResponse,
  ErrorResponse,
  SuccessResponse,
} from "./types";

/**
 * Creates an action function for the specified action path
 * @param actionPath - The path to the action endpoint
 * @returns A function that calls the action with the given input
 */
export function createAction<Path extends keyof ActionTypeMap>(
  actionPath: Path
): (
  input: ActionTypeMap[Path]["input"],
  options?: ActionOptions
) => Promise<ActionResponse<ActionTypeMap[Path]["output"]>> {
  return async (input, options = {}) => {
    const controller = new AbortController();
    const { signal } = controller;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    if (options.timeout) {
      timeoutId = setTimeout(() => controller.abort(), options.timeout);
    }

    try {
      const response = await fetch(`/_actions/${actionPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(input),
        signal,
      });

      if (!response.ok) {
        return {
          status: "error",
          error: `Request failed with status ${response.status}`,
        } as ErrorResponse;
      }

      const data = await response.json();
      if (data.status === "success") {
        return data as SuccessResponse<ActionTypeMap[Path]["output"]>;
      } else {
        return data as ErrorResponse;
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return {
          status: "error",
          error: "Request timed out",
        } as ErrorResponse;
      }

      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      return {
        status: "error",
        error: errorMessage,
      } as ErrorResponse;
    } finally {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    }
  };
}

/**
 * Hook that creates an action function with default options
 * @param actionPath - The path to the action endpoint
 * @param defaultOptions - Default options for the action
 * @returns A function that calls the action with the given input
 */
export function useAction<Path extends keyof ActionTypeMap>(
  actionPath: Path,
  defaultOptions: ActionOptions = {}
) {
  const actionFn = useCallback(
    async (
      input: ActionTypeMap[Path]["input"],
      options: ActionOptions = {}
    ) => {
      const mergedOptions = { ...defaultOptions, ...options };
      const caller = createAction(actionPath);
      return await caller(input, mergedOptions);
    },
    [actionPath, defaultOptions]
  );

  return actionFn;
}

/**
 * Hook that creates an action function with loading and error state
 * @param actionPath - The path to the action endpoint
 * @param defaultOptions - Default options for the action
 * @returns A tuple containing the action function, loading state, and error state
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
