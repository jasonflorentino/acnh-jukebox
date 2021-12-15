import styles from '@/components/SpeechBubble.module.scss';

export default function SpeechBubble() {
  return (
    <div className={styles.SpeechBubbleContainer}>
      <div className={styles.bubble_a}></div>
      <div className={styles.bubble_b}></div>
    </div>
  )
}