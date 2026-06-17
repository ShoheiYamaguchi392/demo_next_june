"use client";

import BasicLayout from "@/components/layouts/HeaderLayout/BasicLayout";
import { CircularProgress, Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import useTop from "./useTop";
import styles from "./Top.module.scss";
import ChannelListItem from "./ChannelListItem";

const Top = () => {
  const {
    isChannelNameRequired,
    channelList,
    hasMore,
    loading,
    isInitialFetchSuccess,
    fetchChannels,
    fetchNextChannels,
    bottomElementRef,
  } = useTop();

  const isFetchNextButtonDisplayed =
    channelList.length > 0 &&
    hasMore &&
    !loading.isFetchLoading &&
    !loading.isNextFetchLoading;

  const isNoContentDisplayed =
    isInitialFetchSuccess && channelList.length === 0;

  const listContent = (
    <>
      {!loading.isFetchLoading && channelList.length > 0 && (
        <ol>
          {channelList.map((channel, index) => (
            <li key={channel.id} className={styles.listItem}>
              <ChannelListItem
                ref={index === channelList.length - 1 ? bottomElementRef : null}
                channel={channel}
              />
            </li>
          ))}
        </ol>
      )}
      {(loading.isFetchLoading || loading.isNextFetchLoading) && (
        <div className={styles.loadingWrapper}>
          <CircularProgress />
        </div>
      )}
      {isFetchNextButtonDisplayed && (
        <Button onClick={fetchNextChannels}>load more</Button>
      )}
      {isNoContentDisplayed && (
        <p className={styles.noContentMessage}>
          チャンネルが見つかりませんでした
        </p>
      )}
    </>
  );

  return (
    <BasicLayout fetchChannels={fetchChannels}>
      {isChannelNameRequired ? (
        <div className={styles.searchChannelsWrapper}>
          チャンネルを検索！
          <ArrowUpwardIcon />
        </div>
      ) : (
        listContent
      )}
    </BasicLayout>
  );
};

export default Top;
