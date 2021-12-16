import styles from '@/components/SpeechBubble.module.scss';

export default function SpeechBubble({ 
  message, 
  name 
}: {
  message: string;
  name: string;
}) {
  return (
    <div className={styles.SpeechBubbleContainer}>
      <div className={styles.speakerName}>{name}</div>
      <div className={styles.messageBox}>
        <p className={styles.messageText}>{message}</p>
      </div>
      <div className={styles.backgroundContainer}>
        <div className={styles.bubble_a}></div>
        <div className={styles.bubble_b}></div>
      </div>
    </div>
  )
}