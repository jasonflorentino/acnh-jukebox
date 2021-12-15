import { Dispatch, SetStateAction } from 'react'
import SpeechBubble from '@/components/SpeechBubble';
import styles from '@/components/TouchPrompt.module.scss';

export default function TouchPrompt({ 
  setRequiresTouchPrompt 
}: {
  setRequiresTouchPrompt: Dispatch<SetStateAction<boolean>>
}) {
  const handleClick = () => {
    setRequiresTouchPrompt(false);
  }
  
  return (
    <div className={styles.outerContainer} onClick={handleClick}>
      <SpeechBubble />
    </div>
  )
}