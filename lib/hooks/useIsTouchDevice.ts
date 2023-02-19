/**
 * Check if running on a touch-enabled
 * device by checking for certain properties
 * and methods in the environment objects
 * 
 * Reference:
 * How to Detect a Touchscreen Device Using JavaScript?
 * John Au-Yeung, Jun 9 2021
 * https://bit.ly/3yryKAc
 */

import { useState, useEffect } from 'react';

export const useIsTouchDevice = () => {
  const [isTouchable, setIsTouchable] = useState(false);

  useEffect(() => {
    const hasTouchStart = 'ontouchstart' in window;
    // @ts-ignore - Says msMaxTouchPoints doesn't exist
    const { maxTouchPoints, msMaxTouchPoints } = navigator
    if (
      hasTouchStart ||
      maxTouchPoints > 0 ||
      msMaxTouchPoints > 0
    ) {
      setIsTouchable(true);
    } else {
      setIsTouchable(false);
    }
    
  }, [setIsTouchable])

  return [isTouchable];
}

export default useIsTouchDevice;