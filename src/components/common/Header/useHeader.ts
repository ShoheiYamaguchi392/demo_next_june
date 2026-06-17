import { useState } from "react";
import { useRouter } from "next/navigation";

import useGetChannelSearchParams from "@/hooks/useGetChannelSearchParams";

import { getTopPageUri } from "@/utils/getRelativeURI";

const useHeader = ({ fetchChannels }) => {
  const { channelName: initialChannelName, isLive: initialIsLive } =
    useGetChannelSearchParams();

  const [channelName, changeChannelName] = useState(initialChannelName);
  const [isLive, changeIsLive] = useState(initialIsLive);

  const router = useRouter();

  const searchChannel = () => {
    const newRelative = "/" + getTopPageUri(channelName, isLive);
    const currentRelativePath =
      window.location.pathname + window.location.search;

    if (newRelative == currentRelativePath && fetchChannels) {
      // 相対URLがそのままの場合は、再フェッチ
      fetchChannels();
    } else {
      // 相対URLが異なる（TOPページの場合、クエリパラメータが更新される）場合
      router.push(getTopPageUri(channelName, isLive));
    }
  };

  return {
    channelName,
    isLive,
    changeChannelName,
    changeIsLive,
    searchChannel,
  };
};

export default useHeader;
