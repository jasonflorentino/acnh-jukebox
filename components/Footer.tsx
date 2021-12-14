import { GoMarkGithub } from 'react-icons/go';

import styles from '@/components/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      Made with ❤️ by Jason Florentino
      <a href='https://github.com/jasonflorentino' target="_blank" rel="noreferrer">
        <GoMarkGithub className={styles.githubIcon} />
      </a>
    </footer>
  )
}