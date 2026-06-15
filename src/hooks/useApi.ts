import axios from "axios";
import { useCallback, useState, useMemo } from "react";

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

  const reset = useCallback(() => {
    setIsSuccess(false);
    setIsError(false);
  }, []);

  const callApi = useCallback(
    async (callback) => {
      setIsLoading(true);
      reset();

      try {
        const response = await callback();

        setIsSuccess(true);
        if (onSuccess) onSuccess(response.data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, reset],
  );

  const defaultConfig = useMemo(() => {
    const abortController = new AbortController();
    return {
      signal: abortController.signal,
    };
  }, []);

  const api = useMemo(() => {
    return {
      get: (path, params?, config = {}) =>
        callApi(
          async () =>
            await axiosInstance.get(path, {
              params,
              ...defaultConfig,
              ...config,
            }),
        ),
      post: (path, data?, config = {}) =>
        callApi(
          async () =>
            await axiosInstance.get(path, {
              data,
              ...defaultConfig,
              ...config,
            }),
        ),
    };
  }, [callApi, defaultConfig]);

  return {
    api,
    isSuccess,
    isError,
    isLoading,
  };
};
