import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Panel.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const url_tags = 'http://localhost:3001/api/tags/';

export const Panel = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get(url_tags)
      .then(response => {
        const transformedTags = response.data.map(tag => ({
          name: tag.name,
          count: tag.article_count,
          color: tag.hex_color
        }));
        setTags(transformedTags);
      })
      .catch(error => console.error('Error fetching tags:', error));
  }, []);

  return (
    <>
      <div className={styles.tasgPanelContainer}>
          <p>🏷️ Trending tags</p>
          <div className={styles.tagsContainer}>
              {tags.map((tag, index) => (
                  <div key={index} className={styles.tag} style={{ backgroundColor: tag.color }}>
                      <Link legacyBehavior href={`/tags/${tag.name}`}>
                          <a>#{tag.name} ({tag.count})</a>
                      </Link>
                  </div>
              ))}
          </div>
      </div>
    </>
  );
};
