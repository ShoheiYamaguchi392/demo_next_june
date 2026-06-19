import * as channelSearchConstants from "@/constants/channelSearch";
import { getSearchParamString } from "@/utils/utils";

export const getTopPageUri = (channelName, isLive) => {
  const stringSearchParams = getSearchParamString({
    [channelSearchConstants.CHANNEL_NAME_KEY]: channelName,
    [channelSearchConstants.IS_LIVE_KEY]: isLive
      ? channelSearchConstants.IS_LIVE_VALUE
      : "",
  });
  return `/?${stringSearchParams}`;
};
