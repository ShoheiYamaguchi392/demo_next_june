import styles from "./ChannelListItem.module.scss";

import Link from "next/link";

import { useInfiniteScrollItem } from "@/hooks/useInfiniteScrollItem";

type Props = {
  ref: React.Ref<HTMLDivElement>;
  channel: {
    displayName: string;
    thumbnailUrl: string;
    id: string;
  };
};

const ChannelListItem = ({ ref, channel }: Props) => {
  const { displayName, thumbnailUrl, id: channelId } = channel;

  const { itemRef, itemMinHeight, isItemOffScreen } = useInfiniteScrollItem();

  return (
    <div ref={ref} className={styles.container}>
      <div
        ref={itemRef as React.RefObject<HTMLDivElement>}
        style={{ minHeight: isItemOffScreen ? itemMinHeight : 0 }}
      >
        <Link
          href={`/channels/${channelId}`}
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
