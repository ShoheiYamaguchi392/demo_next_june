import styles from "./ChannelListItem.module.scss";

import { getTwitchChannelPage } from "@/utils/getTwitchUrl";
import { useInfiniteScrollItem } from "@/hooks/useInfiniteScrollItem";

const ChannelListItem = ({ ref, channel }) => {
  const { displayName, thumbnailUrl, channelPathName } = channel;

  const { itemRef, itemMinHeight, isItemOffScreen } = useInfiniteScrollItem();
  const channelPageUrl = getTwitchChannelPage(channelPathName);

  return (
    <div ref={ref} className={styles.container}>
      <a
        href={channelPageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.wrapper}
        ref={itemRef as React.RefObject<HTMLAnchorElement>}
        style={{ minHeight: isItemOffScreen ? itemMinHeight : 0 }}
      >
        {isItemOffScreen ? null : (
          <>
            <img
              src={thumbnailUrl}
              alt={displayName}
              className={styles.image}
            />
            <div>{displayName}</div>
          </>
        )}
      </a>
    </div>
  );
};

export default ChannelListItem;
