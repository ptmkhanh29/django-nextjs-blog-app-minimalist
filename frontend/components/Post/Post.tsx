import Link from 'next/link';
import JSON_POSTS from '../../public/data/posts.json';
import styles from '../../styles/Post.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const colors = [
  '#33FF57', '#FF5733', '#33C1FF', '#FF33BF', '#8C33FF', '#FFD433', '#FF8E33', '#B8B8B8', '#FFC300', '#581845'
];
const url_post_list = 'http://127.0.0.1:3001/posts';
const url_categories = 'http://127.0.0.1:3001/categories';

function getNextColor() {
  const color = colors.shift();
  colors.push(color);
  return color;
}

export const Post = () => {
  const [categoriesWithColors, setCategoriesWithColors] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(url_post_list)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  useEffect(() => {
    axios.get(url_categories)
      .then(response => {
        const fetchedCategories = response.data.map(category => ({
          name: category.name,
          color: getNextColor()
        }));
        setCategoriesWithColors(fetchedCategories);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <>
      <div className={styles.postContainer}>
        <div className={styles.subHeader}>
            <span className={styles.boldText}>##</span> Vào một ngày đẹp trời thế là chiếc blog này được <a href="https://github.com/ptmkhanh29/django-nextjs-blog-app-minimalist" className={styles.link} target="_blank" rel="noopener noreferrer">build</a>
        </div>
        <div className={styles.categories}>
          {categoriesWithColors.map((category, index) => (
              <Link key={index} href={`/category/${category.name.toLowerCase()}`} className={styles.category} style={{ '--color': category.color }}>
                  {category.name}
              </Link>
            ))}
        </div>
        <div className={styles.blogHeader}>
            📍featured blog
        </div>
        <div className={styles.postList}>        {/* postList container */}
          {posts.map((post) => (
              <Link href={`/post/${post.slug}`} passHref key={post.slug} >
                  <div className={styles.postCard}>
                      <div className={styles.postImage}>
                          <img src={post.image} alt="Mô tả hình ảnh" />
                      </div>
                      <div className={styles.postContent}>
                          <div className={styles.postTitle}># {post.title}</div>
                          <div className={styles.postIntroContent}>
                              {post.content.length > 150 ? `${post.content.slice(0, 150)}...` : post.content}
                          </div>
                          <div className={styles.postMeta}>
                              <div className={styles.postDate}>
                                  <span className={styles.emojiIcon} style={{ marginRight: '5px' }}>🗓️</span>
                                  {moment(post.created_at).format('MMM D, YYYY')}
                              </div>
                              <div className={styles.postTags}>
                                  <span className={styles.emojiIcon}>
                                      <img src="/assets/icons/categories_icon.svg" alt="Tag Icon" style={{ width: '20px', height: '20px' }} />
                                  </span>
                                  {post.categories.map((category, index) => (
                                      <span key={index} className={styles.tag}>
                                          &nbsp;{category}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              </Link>
          ))}
        </div>
      </div>
      
    </>
  );
};
