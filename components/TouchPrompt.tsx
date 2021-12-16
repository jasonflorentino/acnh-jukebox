import { Dispatch, SetStateAction } from 'react'
import SpeechBubble from '@/components/SpeechBubble';
import styles from '@/components/TouchPrompt.module.scss';

const message = 'Hello! I do my best on Desktop! Some things might not work so well here. Sorry! (Tap to dismiss)'

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
      <SpeechBubble 
        message={message} 
        name={'Jukebox'}
      />
    </div>
  )
}