import { useState, useEffect } from 'react';

const useIsMobile = () => {
  console.log('running useIsMobile')
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    console.log('running useIsMobile useeffect')
    console.log(window.screen)
    console.log(navigator.userAgent)
    const { width, height } = window.screen;
    const hasMobileAgent = navigator.userAgent.indexOf('Mobi') > -1;
    if (Math.min(width, height) < 768 || hasMobileAgent) {
      console.log('its mobile')
      setIsMobile(true);
    } else {
      console.log('its not mobile')
      setIsMobile(false);
    };
  }, [])


  return {
    isMobile,
  }
}

export default useIsMobile;