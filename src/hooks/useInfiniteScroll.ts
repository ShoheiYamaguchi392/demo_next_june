import { useState, useCallback, useRef } from "react";

/**
 * スクロールを監視する
 * @param options: IntersectionObserverのオプション
 */
export const useInfiniteScroll = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);
  const bottomElementRef: React.RefCallback<HTMLElement> = useCallback(
    (node) => {
      if (!(node instanceof Element)) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      }, options);

      observer.current.observe(node);
    },
    [],
  );

  return { bottomElementRef, isIntersecting };
};
