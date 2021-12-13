import { useState } from 'react'

import Head from 'next/head'
import AlbumArt from '@/components/AlbumArt'

import styles from '@/styles/Home.module.scss'

export default function Home({ songs }: { songs: Song[] }) {
  const [currentSong, setCurrentSong] = useState<null | Song>(null)

  return (
    <div className={styles.app}>
      <Head>
        <title>ACNH Jukebox</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />

        <meta name="description" content="ACNH Music Jukebox" />
        <meta name="keywords" content="acnh,animal,crossing,new,horizons,kk slider,music,aminal," />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ol className={styles.songList}>
          {songs.map((song: Song) => {
            const isCurrentSong = currentSong?.id === song.id
            return (
              <AlbumArt key={song.id} song={song} isCurrentSong={isCurrentSong} setCurrentSong={setCurrentSong} />
            )
            })}
        </ol>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const req = await fetch('https://acnhapi.com/v1a/songs')
  const data = await req.json()

  return {
    props: {
      songs: data
    }
  }
}