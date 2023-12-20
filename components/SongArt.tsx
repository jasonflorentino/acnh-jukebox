import { useState } from 'react'

import Image from 'next/image'
import SongName from '@/components/SongName'
import { FaPlay } from 'react-icons/fa'
import { makeIdFromSongName, toClassNames } from '@/lib/utils'
import styles from '@/components/SongArt.module.scss'

// Dark blue with 0.8 opacity
const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0D596BgAEIQIBZpsFJQAAAABJRU5ErkJggg=='

export default function SongArt({ 
  song, 
  isCurrentSong, 
  setCurrentSong,
  handlePlay,
  handlePause,
  setAudioUri,
  cancelSearchMode, 
}: {
  song: Song;
  isCurrentSong: boolean;
  setCurrentSong: (newState: null | Song) => void;
  handlePlay: () => void;
  handlePause: () => void;
  setAudioUri: (url: string) => void;
  cancelSearchMode: () => void;
}) {
  const {id, image_uri, name: { 'name-USen': nameUsEn }} = song
  const [showName, setShowName] = useState(false)

  const handleMouseEnter = () => {
    setShowName(true)
  }

  const handleMouseLeave = () => {
    setShowName(false)
  }

  const handleOnClick = () => {
    if (isCurrentSong) {
      setCurrentSong(null);
      handlePause();
    } else {
      setCurrentSong(song);
      setAudioUri(song.music_uri);
      handlePlay();
      cancelSearchMode();
    }
  }
  
  return (
    <li 
      id={makeIdFromSongName(nameUsEn)}
      className={styles.listItem} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      onClick={handleOnClick}
    >
    <SongName name={nameUsEn} showName={showName} />
    <div className={styles.songImageContainer}>
      {isCurrentSong && (
        <div className={styles.playingMarker}>
          <FaPlay className={styles.playIcon}/>
        </div>
      )}
      <div className={toClassNames(
          styles.selected, 
          isCurrentSong ? '' : styles.hidden
        )}
      >
        <Image 
          loading={id === 1 ? 'eager': 'lazy'}
          className={styles.songImage} 
          src={image_uri} 
          alt={nameUsEn} 
          width={300}
          height={300}
          placeholder='blur'
          blurDataURL={blurDataURL}
        />
      </div>
    </div>
  </li>
  )
}
