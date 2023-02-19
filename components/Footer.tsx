import { useRef } from 'react';
import { GoMarkGithub } from 'react-icons/go';

import styles from '@/components/Footer.module.scss';
import { useOnScreen } from '@/lib/hooks';
import { toClassNames } from '@/lib/utils';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <footer 
      ref={ref} 
      className={toClassNames(
        styles.footerContainer, 
        isVisible ? styles.appear : '',
      )}
    >
      Made with ❤️ by Jason Florentino
      <a href='https://github.com/jasonflorentino' target="_blank" rel="noreferrer">
        <GoMarkGithub className={styles.githubIcon} />
      </a>
    </footer>
  )
}