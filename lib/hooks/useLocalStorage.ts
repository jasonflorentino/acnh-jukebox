import { useState, useEffect } from 'react';

const useLocalStorage = () => {
  const [localStorage, setLocalStorage] = useState<Storage | null>(null);

  useEffect(() => {
    if (window) {
      setLocalStorage(window.localStorage)
    }
  }, [])

  return [localStorage]
}

export default useLocalStorage;