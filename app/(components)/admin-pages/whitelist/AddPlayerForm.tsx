'use client';

import { useState } from 'react';
import styles from '@/app/(styles)/admin-styles/whitelist-page.module.css';

interface Props {
  loading: boolean;
  onAdd: (player: string) => Promise<boolean>;
}

export function AddPlayerForm({ loading, onAdd }: Props) {
  const [player, setPlayer] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await onAdd(player);
    if (success) setPlayer('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addForm}>
      <input
        type="text"
        placeholder="Ник игрока"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
        required
        className={styles.addInput}
      />
      <button type="submit" disabled={loading} className={styles.addButton}>
        {loading && <span className={styles.spinner} />}
        {loading ? 'Добавление...' : 'Добавить'}
      </button>
    </form>
  );
}
