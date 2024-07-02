import React from 'react';
import styles from '../../styles/BlockImage.module.css'; // Giả sử bạn đã tạo file CSS này

interface BlockImageProps {
    src: string;
    alt?: string;
}

export const BlockImage: React.FC<BlockImageProps> = ({ src, alt }) => {
  return (
    <span className={styles.containerImage}>
      <span className={styles.imageBlock}>
          <img src={src} alt={alt || 'Image'} className={styles.image} />
          <span className={styles.caption}>{alt}</span>
      </span>
    </span>
  );
};