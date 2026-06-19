import { useSearchParams } from "next/navigation";

import * as channelSearchConstants from "@/constants/channelSearch";

const useGetChannelSearchParams = () => {
  const searchParam = useSearchParams();

  const channelString = searchParam?.get(
    channelSearchConstants.CHANNEL_NAME_KEY,
  );
  const channelName = channelString ? decodeURIComponent(channelString) : "";

  const isLiveValue = searchParam?.get(channelSearchConstants.IS_LIVE_KEY);
  const isLive = isLiveValue === channelSearchConstants.IS_LIVE_VALUE;

  return {
    channelName,
    isLive,
  };
};

export default useGetChannelSearchParams;
