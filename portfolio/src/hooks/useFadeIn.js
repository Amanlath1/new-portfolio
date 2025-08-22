// /src/hooks/useFadeIn.js

import { useState, useEffect, useRef } from 'react';

export const useFadeIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // Instead of only setting to true, we'll set the state
      // based on whether the element is currently intersecting or not.
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    // The cleanup function will run when the component unmounts
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return [isVisible, domRef];
};