import React, { useState, useEffect } from 'react';

type Letter = 'r' | 's';

/**
 * When `acceptKeydown` === true we'll look up a callback fn
 * stored in the ref object we were passed based on the key
 * that was pressed. If a callback was found, call it.
 */
export const useKeydown = (
  keymap: { [K in Letter]: React.RefObject<() => void> | (() => void) }
) => {
  const [acceptKeydown, setAcceptKeydown] = useState(true);

  useEffect(() => {
    const keys = new Map(Object.entries(keymap));

    const handleKeydown = (e: KeyboardEvent) => {
      if (!acceptKeydown) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      e.stopPropagation();

      const inputKey = e.key.toLowerCase();
      if (keys.has(inputKey)) {
        const action = keys.get(inputKey);
        if (typeof action === 'function') {
          action();
        } else if (typeof action?.current === 'function') {
          action.current();
        } else {
          throw new Error('Stored key action is not a function');
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [keymap, acceptKeydown]);

  return {
    acceptKeydown,
    setAcceptKeydown,
  };
};

export default useKeydown;
