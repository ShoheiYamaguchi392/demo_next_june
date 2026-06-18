import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useApi } from "@/hooks/useApi";

const formatChannelInfoDeta = (data) => {
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

  const { api: fetchChannelInfoApi, isLoading } = useApi({
    onSuccess: (data) => {
      setChannelInfo(formatChannelInfoDeta(data.data));
    },
  });

  const fetchChannelInfo = async () => {
    fetchChannelInfoApi.get("channels", {
      broadcaster_id: channelId,
    });
  };

  useEffect(() => {
    fetchChannelInfo();
  }, [channelId]);

  return {
    channelInfo,
    isLoading,
  };
};

export default useChannelDetail;
