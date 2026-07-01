import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState, useMemo, useRef } from "react";

const axiosInstance = axios.create({
  baseURL: "https://api.twitch.tv/helix/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Client-ID": String(process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID),
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_TOKEN}`,
  },
});

type Argument<T> = {
  onSuccess: (data: T) => void;
};

type DefaultConfig = {
  signal: AbortSignal;
};

export const useApi = <T>({ onSuccess }: Argument<T>) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  if (abortControllerRef.current === null) {
    abortControllerRef.current = new AbortController();
  }

  const reset = useCallback(() => {
    setIsSuccess(false);
    setIsError(false);
    abortControllerRef.current = new AbortController();
  }, []);

  const callApi = useCallback(
    async (
      callback: (defaultConfig: DefaultConfig) => Promise<AxiosResponse>,
    ) => {
      setIsLoading(true);
      reset();

      const defaultConfig: DefaultConfig = {
        signal: abortControllerRef.current!.signal,
      };

      try {
        const response = await callback(defaultConfig);

        setIsSuccess(true);
        if (onSuccess) onSuccess(response.data);
      } catch (error) {
        // abortControllerでキャンセルされた場合はリセットする
        if ((error as AxiosError).code === "ERR_CANCELED") {
          reset();
        } else {
          setIsError(true);
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = new AbortController();
      }
    },
    [onSuccess, reset],
  );

  const abortFetch = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const api = useMemo(() => {
    return {
      get: (path: string, params?: { [K: string]: unknown }, config = {}) =>
        callApi(
          async (defaultConfig: DefaultConfig) =>
            await axiosInstance.get(path, {
              params,
              ...defaultConfig,
              ...config,
            }),
        ),
      post: (path: string, data = {}, config = {}) =>
        callApi(
          async (defaultConfig: DefaultConfig) =>
            await axiosInstance.get(path, {
              data,
              ...defaultConfig,
              ...config,
            }),
        ),
    };
  }, [callApi]);

  return {
    api,
    isSuccess,
    isError,
    isLoading,
    abortFetch,
  };
};
