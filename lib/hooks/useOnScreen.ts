import { useState, useEffect, MutableRefObject } from 'react';

/**
 * Hook for determining if an element is visible on screen
 * 
 * Uses the Intersection Observer API
 * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 * 
 * Implementation from SO:
 * https://stackoverflow.com/questions/45514676/react-check-if-element-is-visible-in-dom
 */
export default function useOnScreen(ref:  MutableRefObject<HTMLElement | null>) {

  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    )
    
    observer.observe(ref.current as Element)
    // Remove the observer as soon as the component is unmounted
    return () => { observer.disconnect() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isIntersecting
}