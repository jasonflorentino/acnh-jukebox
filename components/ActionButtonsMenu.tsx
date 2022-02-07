import React from 'react';
import styles from '@/components/ActionButtonsMenu.module.scss';

export default function ActionButtonsMenu(
  { children }: {children: React.ReactNode}
) {
  return (
    <div className={styles.ActionButtonsMenu}>
      {children}
    </div>
  )
}