import { useState, useEffect, useRef } from "react";

const OFF_SCREEN_MARGIN = 500;
console.log(`${OFF_SCREEN_MARGIN}px 0 ${OFF_SCREEN_MARGIN}px 0`);

/**
 * 画面外に消えた要素を、高さをそのままに削除するためのフック
 * 無限スクロールによってDOM描写が増えて動作が重くなることを防ぐ
 */
export const useInfiniteScrollItem = () => {
  const itemRef = useRef<HTMLElement>(null);
  const [itemMinHeight, setItemMinHeight] = useState<number>(0);
  const [isItemOffScreen, setIsItemOffScreen] = useState<boolean>(false);

  // React19以降はコールバックRef内でクリーンアップできる
  useEffect(() => {
    const itemElement = itemRef.current;
    if (!itemElement) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setItemMinHeight(0);
            setIsItemOffScreen(false);
          } else {
            setItemMinHeight(itemElement.offsetHeight);

            setIsItemOffScreen(true);
          }
        });
      },
      {
        rootMargin: `${OFF_SCREEN_MARGIN}px 0px ${OFF_SCREEN_MARGIN}px 0px`,
      },
    );

    intersectionObserver.observe(itemElement);

    return () => {
      intersectionObserver.unobserve(itemElement);
    };
  }, []);

  return {
    itemRef,
    itemMinHeight,
    isItemOffScreen,
    // カード内のアニメーションによって高さが変わる時呼び出す
    resetItemMinHeight: () => {
      setItemMinHeight(0);
    },
  };
};
