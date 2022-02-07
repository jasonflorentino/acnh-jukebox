import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

import ActionButton from '@/components/ActionButton';
import ActionButtonsMenu from '@/components/ActionButtonsMenu';
import BackgroundCover from '@/components/BackgroundCover';
import Footer from '@/components/Footer';
import GradientWave from '@/components/GradientWave';
import Player from '@/components/Player';
import SearchInput from '@/components/SearchInput';
import SongArt from '@/components/SongArt';
import TouchPrompt from '@/components/TouchPrompt';

import makeIdFromSongName from '@/lib/utils/makeIdFromSongName';
import useIsTouchDevice from '@/lib/hooks/useIsTouchDevice';
import useKeydown from '@/lib/hooks/useKeydown';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import restartTimes from '@/lib/restartTimes';
import styles from '@/styles/Home.module.scss';

export default function Home({ songs }: { songs: Song[] }) {
  const [currentSong, setCurrentSong] = useState<null | Song>(null);
  const [requiresTouchPrompt, setRequiresTouchPrompt] = useState(false);
  const [storage] = useLocalStorage();
  const [isTouchDevice] = useIsTouchDevice();
  const audioRef = useRef<HTMLMediaElement>(null);
  const playRandomRef = useRef<() => void>(null); // Stores 'play random' fn

  const searchModeRef = useRef<() => void>(null); // Stores 'handle search mode' fn
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  /**
   * Maps key presses to actions.
   * Provides state var and setter for when key presses will work.
   */
  const { setAcceptKeydown } = useKeydown({
      'r': playRandomRef,
      's': searchModeRef
    })

  //
  // UseEffects
  //

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
      if (restartTime === -1) {
        return setTimeout(() => {}, 100);
      }

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

  //
  // Component Functions
  //

  /**
   * Function for exclicitly playing the
   * the audio element on click.
   */
  const handlePlay = () => {
    const { current: audioEl } = audioRef;
    if (audioEl) {
      audioEl.play();
      /**
       * Make it loop by calling `play` after an 'ended' event.
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

  const handleSearchMode = () => {
    if (isSearching) {
      setIsSearching(false);
      setAcceptKeydown(true);
      setSearchInput('');
    } else {
      setIsSearching(true);
      setAcceptKeydown(false);
    }
  }
  // @ts-ignore - Cannot assign to 'current' because it is a read-only property
  searchModeRef.current = handleSearchMode; // Manually set ref after fn creation

  const cancelSearchMode = () => {
    if (isSearching) {
      handleSearchMode();
    }
  }


  const playRandomSong = () => {
    // Cancel search if clicked while in search mode.
    cancelSearchMode();

    const randIdx = Math.floor(Math.random() * songs.length);
    const song = songs[randIdx];

    setCurrentSong(song);
    setAudioUri(song.music_uri);
    handlePlay();
    
    const id = makeIdFromSongName(song.name['name-USen']);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  // @ts-ignore - Cannot assign to 'current' because it is a read-only property
  playRandomRef.current = playRandomSong; // Manually set ref after fn creation

  const filterSongsFromSearch = (song: Song) => {
    if (!isSearching) return true;
    return song.name['name-USen'].toLowerCase().includes(searchInput.toLowerCase())
  }

  return (
    <div className={styles.app}>
      <Head>
        <title>ACNH Jukebox - Animal Crossing: New Horizons Music Player</title>
        
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta name="description" content="A Web app for playing K.K. Slider jams like in Animal Crossing: New Horizons." />
        <meta name="keywords" content='kk slider, music player, game music'/>
        <meta name="og:title" content='ACNH Jukebox'/>
        <meta name="og:url" content='https://acnhjukebox.vercel.app'/>
        <meta name="og:description" content='A music player for K.K. Slider songs like in Animal Crossing: New Horizons.'/>
        <meta name="og:image" content='https://acnhapi.com/v1/images/songs/95'/>

        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏝</text></svg>" />
        <link rel="stylesheet" href="https://use.typekit.net/cpb3eoy.css"></link>
      </Head>

      {isTouchDevice && requiresTouchPrompt && 
      <TouchPrompt 
        setRequiresTouchPrompt={setRequiresTouchPrompt} 
      />}

      <main className={styles.main}>
        <audio id='audio' ref={audioRef}></audio>

        {isSearching ? (
          <>
            <SearchInput 
              searchInput={searchInput} 
              setSearchInput={setSearchInput}
            />
            <BackgroundCover onClick={handleSearchMode} />
          </>
        ) : (
          <Player 
            currentSong={currentSong} 
            audioRef={audioRef} 
          />
        )}

        <ActionButtonsMenu>
          <ActionButton symbol="r" name='random' onAction={playRandomSong} />
          <ActionButton symbol="s" name='search' onAction={handleSearchMode} />
        </ActionButtonsMenu>
        
        <ol className={styles.songList}>
          {songs.filter(filterSongsFromSearch).map((song: Song) => {
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
                cancelSearchMode={cancelSearchMode}
              />
            );
          })}
        </ol>
      </main>

      <Footer />

      <GradientWave id={1} color='rgba(41,150,253,1)' />
      <GradientWave id={2} color='rgba(255,255,255,0.3)' />
      <GradientWave id={3} color='rgba(102,121,251,1)' />
    </div>
  );
}

export async function getStaticProps() {
  const req = await fetch('https://acnhapi.com/v1a/songs');
  const data: Song[] = await req.json();

  /**
   * Remove unused props from data
   */
  const prunedSongs = data.map((song: Song) => {
    const { 
      'file-name': _unused_fileName,
      'sell-price': _unused_sellPrice,
      'buy-price': _unused_buyPrice, 
      isOrderable: _unused_isOrderable,
      ...prunedSongData 
    } = song;

    return prunedSongData;
  })

  return {
    props: {
      songs: prunedSongs,
    },
  };
}
