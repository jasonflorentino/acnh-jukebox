import { useState } from 'react';
import styles from '@/components/BackgroundLock.module.scss';

const BackgroundLock = ({onClick}: {onClick: () => void}) => {
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
        styles.BackgroundLock, 
        exit ? styles.fadeOut : styles.fadeIn,
      ].join(' ')} 
      onClick={handleClick}
    ></div>
  )
}

export default BackgroundLock;