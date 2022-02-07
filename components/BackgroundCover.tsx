import { useState } from 'react';

import styles from '@/components/BackgroundCover.module.scss';
import useTransition from '@/lib/hooks/useTransition';

const BackgroundCover = ({ onClick }: { onClick: () => void }) => {
  const { isEntering, isExiting, exit } = useTransition({
    timingMs: 250,
    onExit: onClick,
  });

  return (
    <div
      className={[
        styles.BackgroundCover,
        isEntering ?  styles.fadeIn : '',
        isExiting ?  styles.fadeOut : '',
        !isEntering && ! isExiting ? styles.resting : '',
      ].join(' ')}
      onClick={exit}
    ></div>
  );
};

export default BackgroundCover;
