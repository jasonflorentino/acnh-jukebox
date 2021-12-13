import styles from '@/components/SongName.module.scss'

export default function SongName({ name, showName }: {name: string, showName: boolean}) {
  const containerStyle = `${styles.container} ${showName ? styles.containerVisible : ''}` 
  return (
    <div className={containerStyle}>
      <div className={styles.nameContainer}>
        <h2 className={styles.name}>
          {name}
        </h2>
      </div>
    </div>
  )
}