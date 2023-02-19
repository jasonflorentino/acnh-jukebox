/**
 * Not so reliable since some mobile devices now
 * may be larger or have high enough pixel density.
 * 
 * Reference:
 * Detecting mobile browsers with one line of JavaScript
 * By Andrew Archer, Nov 2017
 */

import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const { width, height } = window.screen;
    const hasMobileAgent = navigator.userAgent.indexOf('Mobi') > -1;

    if (Math.min(width, height) < 768 || hasMobileAgent) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    };

  }, [setIsMobile])


  return [isMobile]
}

export default useIsMobile;