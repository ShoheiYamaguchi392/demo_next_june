"use client";

import Link from "next/link";
import { CircularProgress } from "@mui/material";
import useChannelDetail from "./useChannelDetail";
import { getTwitchChannelPage } from "@/utils/getTwitchUrl";

import styles from "./ChannelDetail.module.scss";

const ChannelDetail = (): React.ReactNode => {
  const { channelInfo, isLoading, isError } = useChannelDetail();
  const channelPageUrl = getTwitchChannelPage(channelInfo.loginName);

  return isLoading ? (
    <div className={styles.loadingWrapper}>
      <CircularProgress />
    </div>
  ) : isError ? (
    <p>チャンネル情報を取得できませんでした</p>
  ) : !channelInfo.channelName ? null : (
    <>
      <h1>{channelInfo.channelName}</h1>
      <Link
        href={channelPageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Go to channel page
      </Link>
    </>
  );
};

export default ChannelDetail;
