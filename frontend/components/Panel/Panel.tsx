import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Panel.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const colors = [
  "#ffadad","#ffd6a5","#fdffb6","#caffbf","#9bf6ff","#a0c4ff","#bdb2ff","#ffc6ff","#cfcfc4","#ffafcc"
];

const url_tags = 'http://127.0.0.1:3001/tags';

export const Panel = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get(url_tags)
      .then(response => {
        const transformedTags = response.data.map(tagObj => {
          const [name, count] = Object.entries(tagObj)[0];
          const color = getNextColor();  // Get a color for each tag
          return { name, count, color }; // Add color to each tag object
        });
        setTags(transformedTags);
      })
      .catch(error => console.error('Error fetching tags:', error));
  }, []);

  return (
    <div className={styles.panelContainer}>
        <p>#Trending tags</p>
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
  );
};

function getNextColor() {
  const color = colors.shift();
  colors.push(color);
  return color;
}