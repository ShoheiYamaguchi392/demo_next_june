import styles from "./ChannelListItem.module.scss";

import Link from "next/link";

import { useInfiniteScrollItem } from "@/hooks/useInfiniteScrollItem";

const ChannelListItem = ({ ref, channel }) => {
  const { displayName, thumbnailUrl, channelIdName } = channel;

  const { itemRef, itemMinHeight, isItemOffScreen } = useInfiniteScrollItem();

  return (
    <div ref={ref} className={styles.container}>
      <div
        ref={itemRef as React.RefObject<HTMLDivElement>}
        style={{ minHeight: isItemOffScreen ? itemMinHeight : 0 }}
      >
        <Link
          href={`/channels/${channelIdName}`}
          className={styles.wrapper}
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
        </Link>
      </div>
    </div>
  );
};

export default ChannelListItem;
