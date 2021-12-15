import { useState, useRef } from 'react';

import Head from 'next/head';
import SongArt from '@/components/SongArt';
import Player from '@/components/Player';
import Footer from '@/components/Footer';
import useIsMobile from '@/lib/hooks/useIsMobile';

import styles from '@/styles/Home.module.scss';

export default function Home({ songs }: { songs: Song[] }) {
  const [currentSong, setCurrentSong] = useState<null | Song>(null);
  const audioRef = useRef<HTMLMediaElement>(null);
  const { isMobile } = useIsMobile();

  console.log('isMobile from index', isMobile);

  const handlePlay = () => {
    const { current: audioEl } = audioRef;
    if (audioEl) {
      audioEl.play();
      /**
       * Make it loop my calling `play` after an 'ended' event.
       * (`loop = true` didn't restart as nicely as I'd like)
       * However to avoid creating this event listener
       * again on every click, we set a custom property
       * on the element after adding the listener for 
       * the first time.
       * https://stackoverflow.com/a/47330239
       */
      if (audioEl.getAttribute('endlistener') !== 'true') {
        audioEl.addEventListener('ended', () => {
          audioEl.play();
        });
        audioEl.setAttribute('endlistener', 'true');
      }
    }
  }

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }

  const setAudioUri = (uri: string) => {
    if (audioRef.current && uri) {
      audioRef.current.src = uri;
    }
  }

  return (
    <div className={styles.app}>
      <Head>
        <title>ACNH Jukebox</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />

        <meta name="description" content="ACNH Music Jukebox" />
        <meta
          name="keywords"
          content="acnh,animal,crossing,new,horizons,kk slider,music,aminal,"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <audio id='audio' ref={audioRef}></audio>
        <Player currentSong={currentSong} audioRef={audioRef} />
        <ol className={styles.songList}>
          {songs.map((song: Song) => {
            const isCurrentSong = currentSong?.id === song.id;
            return (
              <SongArt
                key={song.id}
                song={song}
                isCurrentSong={isCurrentSong}
                setCurrentSong={setCurrentSong}
                handlePlay={handlePlay}
                handlePause={handlePause}
                setAudioUri={setAudioUri}
              />
            );
          })}
        </ol>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const req = await fetch('https://acnhapi.com/v1a/songs');
  const data = await req.json();

  return {
    props: {
      songs: data,
    },
  };
}
