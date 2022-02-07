import React, { useState, useEffect } from 'react';
import { GoSearch } from 'react-icons/go';
import { HiPlusCircle, HiMinusCircle } from 'react-icons/hi';
import {
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute,
} from 'react-icons/im';

import styles from '@/components/SearchInput.module.scss';

const SearchInput = ({ currentSong, audioRef }: { 
  currentSong: Song | null;
  audioRef: React.RefObject<HTMLMediaElement>;
 }) => {
  return (
    <div className={styles.searchInput}>
      <div className={styles.nameContainer}>
        <GoSearch className={styles.musicNote} />
        <input className={styles.input} type='text' />  
      </div>
      <div className={styles.volumeContainer}>
        <button>Clear</button>
      </div>
    </div>
  );
}

export default SearchInput;
