import React, { useState, useEffect, useRef } from 'react';
import { GoSearch } from 'react-icons/go';
import { HiPlusCircle, HiMinusCircle } from 'react-icons/hi';
import {
  ImVolumeHigh,
  ImVolumeMedium,
  ImVolumeLow,
  ImVolumeMute,
} from 'react-icons/im';

import styles from '@/components/SearchInput.module.scss';

const SearchInput = ({
  searchInput,
  setSearchInput,
}: {
  searchInput: string;
  setSearchInput: (newInput: string) => void;
}) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    inputRef.current.focus();
    setSearchInput('')
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }

  const clearInput = () => {
    setSearchInput('');
    inputRef.current.focus();
  }

  return (
    <div className={styles.searchInput}>
      <div className={styles.nameContainer}>
        <GoSearch className={styles.musicNote} />
        <input 
          ref={inputRef} 
          className={styles.input} 
          type="text" 
          value={searchInput} 
          onChange={handleSearchInputChange} 
        />
      </div>
      <div className={styles.buttonContainer}>
        <button 
          className={styles.button}
          onClick={clearInput}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
