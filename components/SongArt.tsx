import { useState } from 'react'

import Image from 'next/image'
import SongName from '@/components/SongName'
import { FaPlay } from 'react-icons/fa'

import styles from '@/components/SongArt.module.scss'

// Dark blue with 0.8 opacity
const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN0D596BgAEIQIBZpsFJQAAAABJRU5ErkJggg=='

export default function SongArt({ 
  song, 
  isCurrentSong, 
  setCurrentSong, 
}: {
  song: Song, 
  isCurrentSong: boolean, 
  setCurrentSong: (newState: null | Song) => void,
}) {
  const {id, image_uri, music_uri, name: { 'name-USen': nameUsEn }} = song
  const [showName, setShowName] = useState(false)

  const handleMouseEnter = () => {
    setShowName(true)
  }

  const handleMouseLeave = () => {
    setShowName(false)
  }

  const handleOnClick = () => {
    if (isCurrentSong) {
      setCurrentSong(null)
    } else {
      setCurrentSong(song)
    }
  }
  
  return (
    <li 
      key={id}
      id={nameUsEn.replace(/[^a-zA-Z]/g, '')}
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
      <div className={`${styles.selected} ${isCurrentSong ? '' : styles.hidden}`}>
        <Image 
          className={styles.songImage} 
          src={image_uri} 
          alt={nameUsEn} 
          width={200} 
          height={200} 
          layout='responsive' 
          placeholder='blur'
          blurDataURL={blurDataURL}
        />
      </div>
    </div>
  </li>
  )
}
