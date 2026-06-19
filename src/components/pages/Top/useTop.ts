import { useState, useEffect, useRef } from "react";

import { useApi } from "@/hooks/useApi";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import useGetChannelSearchParams from "@/hooks/useGetChannelSearchParams";
import { usePathname } from "next/navigation";

type channelList = {
  id: string;
  displayName: string;
  thumbnailUrl: string;
}[];

const MaxFetchLength = 20;

const formatChannelData = (channelList) => {
  return channelList.map(({ id, display_name, thumbnail_url }) => {
    return {
      id,
      displayName: display_name,
      thumbnailUrl: thumbnail_url,
    };
  });
};

const useTop = () => {
  const { channelName, isLive } = useGetChannelSearchParams();
  const [channelList, setChannelList] = useState<channelList>([]);
  const [paginationCursor, setPaginationCursor] = useState(undefined);
  const searchConditionRef = useRef({
    channelName: "",
    isLive: false,
  });
  const pathname = usePathname();

  const isTopPage = pathname === "/";
  // チャンネル詳細モーダル（パスが変わるがモーダルが表示されるのみ）に遷移した場合は、channelNameを求めない
  const isChannelNameRequired = !channelName && isTopPage;

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
    abortFetch: abortInitialFetch,
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
  const {
    api: nextFetchApi,
    isLoading: isNextFetchLoading,
    abortFetch: abortNextFetch,
  } = useApi({
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
    // チャンネル詳細モーダル（パスが変わるがモーダルが表示されるのみ）に遷移した場合は、fetchChannelsしない
    if (
      !isTopPage ||
      (searchConditionRef.current.channelName === channelName &&
        searchConditionRef.current.isLive === isLive) ||
      isChannelNameRequired
    )
      return;
    searchConditionRef.current = {
      channelName: channelName,
      isLive: isLive,
    };
    fetchChannels();

    return () => {
      abortInitialFetch();
    };
  }, [channelName, isLive]);

  useEffect(() => {
    if (!isIntersecting) return;
    fetchNextChannels();
  }, [isIntersecting]);

  useEffect(() => {
    return () => {
      abortNextFetch();
    };
  }, []);

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
