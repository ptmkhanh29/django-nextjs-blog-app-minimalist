import Link from 'next/link';
import JSON_POSTS from '../../public/data/posts.json';
import styles from '../../styles/Post.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const url_post_list = 'http://127.0.0.1:3001/posts';

export const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(url_post_list)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <>
      <div className={styles.postList}>        {/* postList container */}
          <div className={styles.blogHeader}>
            📍featured blog
          </div>
          {posts.map((post) => (
              <Link href={`/post/${post.slug}`} passHref key={post.slug}>
                  <div className={styles.postCard}>
                      <div className={styles.postImage}>
                          <img src={post.image || '/image1.png'} alt="Mô tả hình ảnh" />
                      </div>
                      <div className={styles.postContent}>
                          <div className={styles.postTitle}># {post.title}</div>
                          <div className={styles.postIntroContent}>
                              {post.content.length > 150 ? `${post.content.slice(0, 150)}...` : post.content}
                          </div>
                          <div className={styles.postMeta}>
                              <div className={styles.postDate}>
                                  <FontAwesomeIcon icon={faCalendar} style={{ marginRight: '5px' }} className="fa-fw me-1" /> {/* Biểu tượng lịch */}
                                  {moment(post.created_at).format('MMM D, YYYY')}
                              </div>
                              <div className={styles.postTags}>
                                  <FontAwesomeIcon icon={faFolderOpen} style={{ marginRight: '5px' }} className="fa-fw me-1" /> {/* Biểu tượng sách */}
                                  {post.tags.map((tag, index) => (
                                      <span key={index} className={styles.tag}>{tag}</span>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              </Link>
          ))}
      </div>
    </>
  );
};
