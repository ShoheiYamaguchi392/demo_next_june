import { useState } from "react";
import { useRouter } from "next/navigation";

import useGetChannelSearchParams from "@/hooks/useGetChannelSearchParams";

import { getTopPageUri } from "@/utils/getRelativeURI";

const useHeader = () => {
  const { channelName: initialChannelName, isLive: initialIsLive } =
    useGetChannelSearchParams();

  const [channelName, changeChannelName] = useState(initialChannelName);
  const [isLive, changeIsLive] = useState(initialIsLive);

  const router = useRouter();

  const searchChannel = () => {
    const newRelative = "/" + getTopPageUri(channelName, isLive);
    const currentRelativePath =
      window.location.pathname + window.location.search;
    if (newRelative !== currentRelativePath) {
      router.push(getTopPageUri(channelName, isLive));
    }
    /*  
      TODO:
        同じ相対URLだった場合は、ページ遷移をせずにリスト一覧を再取得する形に変更する
        Headerの検索バー部分を、リストの一覧に移動しても良い
    */
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
