import { SyntheticEvent } from 'react';
import styles from '@/components/ActionButton.module.scss';
import makeFirstLetterUpperCase from '@/lib/utils/makeFirstLetterUpperCase';

export default function ActionButton({
  symbol, 
  name, 
  onAction
}: {
  symbol: string;
  name: string;
  onAction: () => void;
}) {
  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    onAction();
  }

  return (
    <button className={styles.ActionButton} onClick={handleClick}>
      <ActionButtonSymbol symbol={symbol} />
      {makeFirstLetterUpperCase(name)}
    </button>
  )
}

function ActionButtonSymbol({symbol}:{symbol: string}) {
  return (
    <span className={styles.ActionButtonSymbol}>
      {symbol.toUpperCase()}
    </span>
  )
}