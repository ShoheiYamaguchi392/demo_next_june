import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useApi } from "@/hooks/useApi";

type ResponseData = {
  data: {
    broadcaster_name: string;
    broadcaster_login: string;
  }[];
};

const formatChannelInfoData = ({ data }: ResponseData) => {
  return {
    channelName: data[0]?.broadcaster_name,
    loginName: data[0]?.broadcaster_login,
  };
};

type channelInfo = {
  channelName: string;
  loginName: string;
};

const useChannelDetail = () => {
  const params = useParams();
  const channelId = params?.channelId;
  const [channelInfo, setChannelInfo] = useState<channelInfo>({
    channelName: "",
    loginName: "",
  });

  const {
    api: fetchChannelInfoApi,
    isLoading,
    isError,
    abortFetch,
  } = useApi<ResponseData>({
    onSuccess: (data) => {
      setChannelInfo(formatChannelInfoData(data));
    },
  });

  const fetchChannelInfo = async () => {
    fetchChannelInfoApi.get("channels", {
      broadcaster_id: channelId,
    });
  };

  useEffect(() => {
    fetchChannelInfo();

    return () => {
      abortFetch();
    };
  }, [channelId]);

  return {
    channelInfo,
    isLoading,
    isError,
  };
};

export default useChannelDetail;
