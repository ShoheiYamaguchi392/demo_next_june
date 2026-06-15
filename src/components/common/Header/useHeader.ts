import { useState } from "react";
import { useRouter } from "next/navigation";

import useGetChannelSearchParams from "@/hooks/useGetChannelSearchParams";

import { getTopPageURI } from "@/utils/getRelativeURI";

const useHeader = () => {
  const { channelName: initialChannelName, isLive: initialIsLive } =
    useGetChannelSearchParams();

  const [channelName, changeChannelName] = useState(initialChannelName);
  const [isLive, changeIsLive] = useState(initialIsLive);

  const router = useRouter();

  const searchChannel = () => {
    router.push(getTopPageURI(channelName, isLive));
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
