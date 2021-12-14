import { useState, useEffect } from 'react';
import { IoMdMusicalNote } from 'react-icons/io';
import { HiPlusCircle, HiMinusCircle } from 'react-icons/hi';
import {
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute,
} from 'react-icons/im';

import styles from '@/components/Player.module.scss';

type VolumeLevels = 0 | 1 | 2 | 3;

const VolumeMultiplier = 0.33;

export default function Player({ currentSong }: { currentSong: Song | null }) {
  const { name: { 'name-USen': nameUsEn = '---' } = {} } = currentSong || {};
  const [audioElement, setAudioElement] = useState<null | HTMLMediaElement>(
    null
  );
  const [volumeLevel, setVolumeLevel] = useState<VolumeLevels>(2);

  const setVolume = (level: VolumeLevels) => {
    if (audioElement) {
      audioElement.volume = level * VolumeMultiplier;
    }
  };

  const incrementVolume = () => {
    if (volumeLevel === 3) {
      return;
    } else {
      const newLevel = (volumeLevel + 1) as VolumeLevels;
      setVolume(newLevel);
      setVolumeLevel(newLevel);
    }
  };

  const decrementVolume = () => {
    if (volumeLevel === 0) {
      return;
    } else {
      const newLevel = (volumeLevel - 1) as VolumeLevels;
      setVolume(newLevel);
      setVolumeLevel(newLevel);
    }
  };

  useEffect(() => {
    const configureAudioElement = (mediaEl: HTMLMediaElement) => {
      mediaEl.addEventListener('canplay', () => {
        mediaEl.play();
      });
      mediaEl.loop = true;
      mediaEl.volume = volumeLevel * VolumeMultiplier;
    };

    /**
     * Handle song change
     * Stop and Clear current song if it exists
     * Create and set incoming song
     */
    if (currentSong) {
      if (audioElement) {
        audioElement.pause();
        setAudioElement(null);
      }
      const newAudioEl = new Audio(currentSong.music_uri);
      configureAudioElement(newAudioEl);
      setAudioElement(newAudioEl);
    } else {
      if (audioElement) {
        audioElement.pause();
      }
      setAudioElement(null);
    }

    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  return (
    <div className={styles.playerContainer}>
      <div className={styles.nameContainer}>
        <IoMdMusicalNote className={styles.musicNote} /> {nameUsEn}
      </div>
      <div className={styles.volumeContainer}>
        <span
          onClick={decrementVolume}
          className={[
            styles.volumeControlIcon,
            volumeLevel === 0 ? styles.volumeControlIconDisabled : '',
          ].join(' ')}
        >
          <HiMinusCircle />
        </span>
        <div className={styles.volumeLevelContainer}>
          {volumeLevel === 0 && <ImVolumeMute className={styles.volumeLevelBuildupIcon} />}
          {volumeLevel === 1 && <ImVolumeLow className={styles.volumeLevelBuildupIcon} />}
          {volumeLevel === 2 && <ImVolumeMedium className={styles.volumeLevelBuildupIcon} />}
          {volumeLevel === 3 && <ImVolumeHigh className={styles.volumeLevelBuildupIconMax} />}
          <ImVolumeHigh className={styles.volumeLevelBaseIcon} />
        </div>
        <span
          onClick={incrementVolume}
          className={[
            styles.volumeControlIcon,
            volumeLevel === 3 ? styles.volumeControlIconDisabled : '',
          ].join(' ')}
        >
          <HiPlusCircle />
        </span>
      </div>
    </div>
  );
}
