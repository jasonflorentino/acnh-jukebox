import React, { useState, useEffect } from 'react';
import { IoMdMusicalNote } from 'react-icons/io';
import { FaPlay, FaPause } from 'react-icons/fa';
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

const Player = ({ currentSong, audioRef }: { 
  currentSong: Song | null;
  audioRef: React.RefObject<HTMLMediaElement>;
 }) => {
  const { name: { 'name-USen': nameUsEn = '---' } = {} } = currentSong || {};
  const [volumeLevel, setVolumeLevel] = useState<VolumeLevels>(1);
  const { current: audioEl } = audioRef;

  const setElementVolume = (level: VolumeLevels) => {
    if (audioEl) {
      audioEl.volume = level * VolumeMultiplier;
    }
  };

  const incrementVolume = () => {
    if (volumeLevel === 3) {
      return;
    } else {
      const newLevel = (volumeLevel + 1) as VolumeLevels;
      setElementVolume(newLevel);
      setVolumeLevel(newLevel);
    }
  };

  const decrementVolume = () => {
    if (volumeLevel === 0) {
      return;
    } else {
      const newLevel = (volumeLevel - 1) as VolumeLevels;
      setElementVolume(newLevel);
      setVolumeLevel(newLevel);
    }
  };

  /**
   * Ensure element volume is synced 
   * with in-state volume level.
   * This is mainly only a concern 
   * on initial load, when volume
   * hasn't been set by user yet.
   */
  useEffect(() => {
    if (nameUsEn && audioRef) {
      setElementVolume(volumeLevel)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameUsEn, audioRef])  

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

export default Player;
