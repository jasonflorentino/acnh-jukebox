import React, { useState, useEffect } from 'react';

type Letter = 'r' | 's';

const useKeydown = (keymap: {[K in Letter]: React.RefObject<() => void> | (() => void)}) => {
  const [acceptKeydown, setAcceptKeydown] = useState(true);

  useEffect(() => {
    console.log('keydown effect!')
    const keys = new Map(Object.entries(keymap));
    
    const handleKeydown = (e: KeyboardEvent) => {
      if (!acceptKeydown) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      console.log('keydown callback!')
      e.stopPropagation();

      const inKey = e.key.toLowerCase();
      if (keys.has(inKey)) {
        const action = keys.get(inKey);
        if (typeof action === 'function') {
          action();
        } else if (typeof action?.current === 'function') {
           action.current();
        } else {
          console.error(action);
          throw new Error('Stored key action is not a function')
        }
      }
    }
    
    document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [keymap])

  return {
    acceptKeydown,
    setAcceptKeydown
  }
}

export default useKeydown;