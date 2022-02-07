import { useState } from 'react';
import styles from '@/components/BackgroundCover.module.scss';

const BackgroundCover = ({onClick}: {onClick: () => void}) => {
  const [exit, setExit] = useState(false);

  const handleClick = () => {
    setExit(true);
    setTimeout(() => {
      onClick();
    }, 200)
  }

  return (
    <div 
    className={[
        styles.BackgroundCover, 
        exit ? styles.fadeOut : styles.fadeIn,
      ].join(' ')} 
      onClick={handleClick}
    ></div>
  )
}

export default BackgroundCover;