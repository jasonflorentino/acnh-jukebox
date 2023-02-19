import styles from '@/components/BackgroundCover.module.scss';
import { useTransition } from '@/lib/hooks';
import { toClassNames } from '@/lib/utils'

const BackgroundCover = ({ onClick }: { onClick: () => void }) => {
  const { isEntering, isExiting, exit } = useTransition({
    timingMs: 250,
    onExit: onClick,
  });

  return (
    <div
      className={toClassNames(
        styles.BackgroundCover,
        isEntering ?  styles.fadeIn : '',
        isExiting ?  styles.fadeOut : '',
        !isEntering && ! isExiting ? styles.resting : '',
      )}
      onClick={exit}
    ></div>
  );
};

export default BackgroundCover;
