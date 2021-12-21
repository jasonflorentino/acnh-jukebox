import { useRef } from 'react';
import { GoMarkGithub } from 'react-icons/go';

import useOnScreen from '@/lib/hooks/useOnScreen';
import styles from '@/components/Footer.module.scss';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <footer 
      ref={ref} 
      className={[
        styles.footerContainer, 
        isVisible ? styles.appear : '',
      ].join(' ')}
    >
      Made with ❤️ by Jason Florentino
      <a href='https://github.com/jasonflorentino' target="_blank" rel="noreferrer">
        <GoMarkGithub className={styles.githubIcon} />
      </a>
    </footer>
  )
}