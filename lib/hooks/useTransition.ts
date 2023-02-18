import { useState, useEffect } from 'react';

const noop = () => {};

const useTransition = ({
  timingMs = 250,
  onExit = noop,
}: {
  timingMs: number;
  onExit: () => void;
}) => {
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsEntering(false);
    }, timingMs);
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onExit();
    }, timingMs);
  };

  return {
    isEntering,
    isExiting,
    exit,
  };
};

export default useTransition;
