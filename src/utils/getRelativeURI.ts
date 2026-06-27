import * as channelSearchConstants from "@/constants/channelSearch";
import { getSearchParamString } from "@/utils/utils";

export const getTopPageUri = (channelName: string, isLive: boolean): string => {
  const stringSearchParams = getSearchParamString({
    [channelSearchConstants.CHANNEL_NAME_KEY]: channelName,
    [channelSearchConstants.IS_LIVE_KEY]: isLive
      ? channelSearchConstants.IS_LIVE_VALUE
      : "",
  });
  return `/?${stringSearchParams}`;
};
