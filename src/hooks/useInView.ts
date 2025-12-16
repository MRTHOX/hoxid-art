import { useCallback, useEffect, useState } from 'react';

type UseInViewOptions = IntersectionObserverInit;

export function useInView<T extends HTMLElement>(options?: UseInViewOptions) {
  const { root = null, rootMargin = '200px', threshold = 0 } = options || {};
  const [target, setTarget] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === target) {
            setInView(entry.isIntersecting);
          }
        });
      },
      { root, rootMargin, threshold }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [target, root, rootMargin, threshold]);

  const ref = useCallback((node: T | null) => {
    setTarget(node);
  }, []);

  return { ref, inView };
}
