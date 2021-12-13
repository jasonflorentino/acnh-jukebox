import { useState } from 'react'

import Image from 'next/image'
import SongName from '@/components/SongName'

import styles from '@/styles/Home.module.scss'

// Solid light yellow
const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP88u3+fwAJeQPKz5nhtAAAAABJRU5ErkJggg=='

export default function AlbumArt({ song }: {song: Song}) {
  const {id, image_uri, music_uri, name: { 'name-USen': nameUsEn }} = song
  const [showName, setShowName] = useState(false)

  const handleMouseEnter = () => {
    setShowName(true)
  }

  const handleMouseLeave = () => {
    setShowName(false)
  }
  
  return (
    <li 
      key={id}
      className={styles.listItem} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
    <SongName name={nameUsEn} showName={showName} />
    <div className={styles.songImageContainer}>
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
  </li>
  )
}
