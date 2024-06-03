import Link from 'next/link';
import JSON_POSTS from '../../public/data/posts.json';
import styles from '../../styles/Post.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { url_post_list,  url_categories} from '../../config/_global_var';

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
          color: category.hex_color
        }));
        setCategoriesWithColors(fetchedCategories);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <>
      <div className={styles.postContainer}>
        {/*<div className={styles.subHeader}>
            <span className={styles.boldText}>##</span> Vào một ngày đẹp trời thế là chiếc blog này được <a href="https://github.com/ptmkhanh29/django-nextjs-blog-app-minimalist" className={styles.link} target="_blank" rel="noopener noreferrer">build</a>
        </div>*/}
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
          {posts.filter(post => post.type === "Post").map((post) => (
              <Link href={`/post/${post.slug}`} passHref key={post.slug} >
                  <div className={styles.postCard}>
                      {post.image_url && (
                        <div className={styles.postImage}>
                                <img src={post.image_url} alt="Mô tả hình ảnh" />
                            </div>
                        )}
                      <div className={styles.postContent}>
                          <div className={styles.postTitle}># {post.title}</div>
                          <div className={styles.postIntroContent}>
                              <div dangerouslySetInnerHTML={{ __html: post.content.length > 200 ? `${post.content.slice(0, 200)}...` : post.content }} />
                          </div>
                          <div className={styles.postMeta}>
                              <div className={styles.postDate}>
                                  <span className={styles.emojiIcon} style={{ marginRight: '5px' }}>🗓️</span>
                                  {moment(post.created_at).format('MMM D, YYYY')}
                              </div>
                              <div className={styles.postCategory}>
                                  <span className={styles.emojiIcon}>
                                      <img src="/assets/icons/categories_icon.svg" alt="Tag Icon" style={{ width: '20px', height: '20px' }} />
                                  </span>
                                  {post.category.map((category, index) => (
                                      <Link 
                                          key={index} 
                                          href={`/category/${encodeURIComponent(category)}`} 
                                          className={styles.tag}
                                          style={{ display: 'inline', cursor: 'pointer' }}>
                                          &nbsp;{category}
                                      </Link>
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
