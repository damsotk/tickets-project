'use client';

import { useState } from 'react';
import { getInitials } from '@/utils/get-initials';
import { getRandomColorByText } from '@/utils/get-random-color-by-text';
import styles from '@/app/(styles)/profile-styles/transfer-coins.module.css';

interface UserAvatarProps {
  name: string;
  avatar: string | null;
  size?: number;
}

export default function UserAvatar({ name, avatar, size = 32 }: UserAvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const sizeStyle = { width: size, height: size, fontSize: size * 0.45 };

  if (avatar && avatar === failedSrc) {
    return <span className={styles.avatarBroken} style={sizeStyle} />;
  }

  if (avatar) {
    return (
      <img
        src={avatar}
        alt=""
        className={styles.avatar}
        style={sizeStyle}
        onError={() => setFailedSrc(avatar)}
      />
    );
  }

  return (
    <span
      className={styles.avatarPlaceholder}
      style={{ ...sizeStyle, backgroundColor: getRandomColorByText(name) }}
    >
      {getInitials(name)}
    </span>
  );
}
