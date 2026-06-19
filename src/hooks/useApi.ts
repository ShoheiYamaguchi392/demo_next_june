import axios from "axios";
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

export const useApi = ({ onSuccess }) => {
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
    async (callback) => {
      setIsLoading(true);
      reset();

      const defaultConfig = {
        signal: abortControllerRef.current?.signal,
      };

      try {
        const response = await callback(defaultConfig);

        setIsSuccess(true);
        if (onSuccess) onSuccess(response.data);
      } catch (error) {
        // abortControllerでキャンセルされた場合はリセットする
        if (error.code === "ERR_CANCELED") {
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
      get: (path, params?, config = {}) =>
        callApi(
          async (defaultConfig) =>
            await axiosInstance.get(path, {
              params,
              ...defaultConfig,
              ...config,
            }),
        ),
      post: (path, data?, config = {}) =>
        callApi(
          async (defaultConfig) =>
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
