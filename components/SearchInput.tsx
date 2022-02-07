import React, { useEffect, useRef } from 'react';
import { GoSearch } from 'react-icons/go';

import styles from '@/components/SearchInput.module.scss';

const SearchInput = ({
  searchInput,
  setSearchInput,
  cancelSearchMode,
}: {
  searchInput: string;
  setSearchInput: (newInput: string) => void;
  cancelSearchMode: () => void;
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
      <div className={styles.textContainer}>
        <GoSearch className={styles.searchIcon} />
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
        <button 
          className={styles.button}
          onClick={cancelSearchMode}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
