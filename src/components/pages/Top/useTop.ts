import { useState, useEffect } from "react";

import { useApi } from "@/hooks/useApi";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import useGetChannelSearchParams from "@/hooks/useGetChannelSearchParams";

type channelList = {
  id: string;
  displayName: string;
  thumbnailUrl: string;
  channelIdName: string;
}[];

const MaxFetchLength = 20;

const formatChannelData = (channelList) => {
  return channelList.map(
    ({ id, display_name, thumbnail_url, broadcaster_login }) => {
      return {
        id,
        displayName: display_name,
        thumbnailUrl: thumbnail_url,
        channelIdName: broadcaster_login,
      };
    },
  );
};

const useTop = () => {
  const { channelName, isLive } = useGetChannelSearchParams();
  const isChannelNameRequired = !channelName;

  const [channelList, setChannelList] = useState<channelList>([]);
  const [paginationCursor, setPaginationCursor] = useState(undefined);

  const apiCommonQuery = {
    first: MaxFetchLength,
    query: channelName,
    live_only: isLive,
  };

  /**
   * 初回取得
   */
  const {
    api: initialFetchApi,
    isSuccess: isInitialFetchSuccess,
    isLoading: isFetchLoading,
  } = useApi({
    onSuccess: (data) => {
      setChannelList(formatChannelData(data.data));
      setPaginationCursor(data?.pagination?.cursor); // 次の取得開始位置を示す
    },
  });

  /**
   * 初回取得
   */
  const fetchChannels = async () => {
    initialFetchApi.get("search/channels", apiCommonQuery);
  };

  /**
   * 追加取得
   */
  const { api: nextFetchApi, isLoading: isNextFetchLoading } = useApi({
    onSuccess: (data) => {
      setChannelList((prevState) => [
        ...prevState,
        ...formatChannelData(data.data),
      ]);
      setPaginationCursor(data?.pagination?.cursor);
    },
  });
  const { isIntersecting, bottomElementRef } = useInfiniteScroll({
    rootMargin: "0px 0px 1000px 0px",
  });
  const fetchNextChannels = async () => {
    if (
      !(channelList.length > 0) ||
      isFetchLoading ||
      isNextFetchLoading ||
      !paginationCursor
    ) {
      return;
    }
    nextFetchApi.get("search/channels", {
      after: paginationCursor,
      ...apiCommonQuery,
    });
  };

  useEffect(() => {
    if (isChannelNameRequired) return;
    fetchChannels();
  }, [channelName, isLive]);

  useEffect(() => {
    if (!isIntersecting) return;
    fetchNextChannels();
  }, [isIntersecting]);

  return {
    isChannelNameRequired,
    channelList,
    hasMore: !!paginationCursor,
    isInitialFetchSuccess,
    loading: {
      isFetchLoading,
      isNextFetchLoading,
    },
    fetchChannels,
    fetchNextChannels,
    bottomElementRef,
  };
};

export default useTop;
