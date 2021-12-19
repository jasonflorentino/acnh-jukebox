import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

import SongArt from '@/components/SongArt';
import Player from '@/components/Player';
import Footer from '@/components/Footer';
import TouchPrompt from '@/components/TouchPrompt';
import useIsTouchDevice from '@/lib/hooks/useIsTouchDevice';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import restartTimes from '@/lib/restartTimes';
import styles from '@/styles/Home.module.scss';

export default function Home({ songs }: { songs: Song[] }) {
  const [currentSong, setCurrentSong] = useState<null | Song>(null);
  const [requiresTouchPrompt, setRequiresTouchPrompt] = useState(false);
  const [storage] = useLocalStorage();
  const [isTouchDevice] = useIsTouchDevice();
  const audioRef = useRef<HTMLMediaElement>(null);

  /**
   * Handles showing mobile prompt
   * only once to non-desktop users
   */
  useEffect(() => {
    if (storage) {
      const hasReceivedTouchPromp = storage.getItem('receivedTouchPrompt') === 'true';
      if (isTouchDevice && !hasReceivedTouchPromp) {
        setRequiresTouchPrompt(true);
        storage.setItem('receivedTouchPrompt', 'true');
      }
    }
  }, [isTouchDevice, requiresTouchPrompt, storage])

  /**
   * Handles starting a loop-back timer when
   * the current song changes to provide
   * more seamless looping of songs for which
   * we know a restart time.
   * 
   * Implements a method I experimented with here:
   * https://codepen.io/jasonflorentino/pen/mdBwJpd?editors=1010
   */
  useEffect(() => {
    const { current: audioEl } = audioRef;
    const restartTime = restartTimes[currentSong ? currentSong.id : '0'];
    const TIMEOUT = 1;
    const INTERVAL = 2;
    let timerType: number;
    let timerId: NodeJS.Timer | NodeJS.Timeout;

    const cancelPoll = () => {
      if (timerId) {
        if (timerType === TIMEOUT) {
          clearTimeout(timerId); 
        } else if (timerType === INTERVAL) {
          clearInterval(timerId);
        }
      }
    }

    const pollForRestart = (
      audio: HTMLMediaElement, 
      restartTime: number, // Seconds
      step: number // Milliseconds
    ) => {
      // no op for unknown restart time
      if (restartTime === -1) return setTimeout(() => {}, 100);
      cancelPoll();

      if (step <= 2000) {
        timerType = INTERVAL
        timerId = setInterval(() => {
          if (audio.currentTime >= restartTime) {
            audio.currentTime = 0;
            clearInterval(timerId);
            // Start long polling for next loop
            timerId = pollForRestart(audio, restartTime, restartTime * 1000);
            timerType = TIMEOUT;
          }
        }, 50);
        return timerId;
      }
    
      timerType = TIMEOUT;
      return setTimeout(() => {
        timerId = pollForRestart(audio, restartTime, step / 2);
      }, step / 2);
    }

    if (audioEl && currentSong) {
      timerId = pollForRestart(audioEl, restartTime, restartTime * 1000);
    }

    return () => {
      cancelPoll();
    }
  }, [currentSong])

  /**
   * Function for exclicitly playing the
   * the audio element on click.
   */
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
        <link rel="stylesheet" href="https://use.typekit.net/cpb3eoy.css"></link>
      </Head>

      {isTouchDevice && requiresTouchPrompt && 
      <TouchPrompt 
        setRequiresTouchPrompt={setRequiresTouchPrompt} 
      />}

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
