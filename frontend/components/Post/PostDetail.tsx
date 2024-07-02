import Link from 'next/link';
import { PostType } from './Post';
import { RenderMarkdown } from '../RenderMarkdown';
import { Main } from '../../layouts/Main';
import moment from 'moment';
import styles from '../../styles/PostDetail.module.css'; // Ensure the path is correct
import { Giscus } from '../Giscus/Giscus';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { rehype } from 'rehype';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';  // Hoặc bất kỳ theme nào bạn thích


function copyLinkToClipboard() {
  const dummy = document.createElement('textarea');
  dummy.value = window.location.href;
  document.body.appendChild(dummy);
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  alert('Link copied to clipboard!');
}


const formatDate = (date) => {
  // Set the timezone to UTC or a specific timezone
  return moment(date).tz('UTC').format('MMM D, YYYY');
}

type PostDetailType = {
  post: PostType;
};

export const PostDetail = ({ post }: PostDetailType) => {
  //console.log("Content Type:", typeof post.content); // Kiểm tra lại kiểu
  //console.log("Content Value:", post.content);       // Xem giá trị thực tế
  
  return (
    <>
      <Main>
        <div className={styles.postDetailContainer}>
          <nav aria-label={styles.Breadcrumb}>
            <ul className={styles.breadcrumb}> {/* sửa 'class' thành 'className' */}
              <li><a href="/">Home</a></li>
              <li aria-current="page">{post.category}</li>
            </ul>
          </nav>
          <div className={styles.titleContainer}>
            {post.title}
          </div>
          <div className={styles.imageContainer}>
            <img src={post.image_url} alt={post.title} />
          </div>
          <div class={styles.introAuthorContainer}>
            <Link legacyBehavior href="https://www.facebook.com/MinhKhanhPhanTruong/">
                <a className={styles.authorContainer} target="_blank" rel="noopener noreferrer">
                   By @<span style={{ textDecoration: 'underline' }}>ptmkhanh29</span>
                </a>
            </Link>
            <span className={styles.dateCreated}> &nbsp; 📆 Created at {post.formattedDate}</span>
          </div>
          <div className={styles.categoryContainer}>
            <Link legacyBehavior href={`/categories/${post.category}`}>
              <a>
                📁 {post.category}
              </a>
            </Link>
            <div className={styles.shareIcons}>
              <a href="https://twitter.com/share?url=YOUR_URL" target="_blank" rel="noopener noreferrer" title="Share on X">
                <img src="/assets/icons/twitter-share.svg" alt="Share on Twitter" className={styles.icon} />
              </a>
              <a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL" target="_blank" rel="noopener noreferrer" title="Share on Facebook">
                <img src="/assets/icons/facebook-share.svg" alt="Share on Facebook" className={styles.icon} />
              </a>
              <a href="https://www.linkedin.com/shareArticle?url=YOUR_URL" target="_blank" rel="noopener noreferrer" title="Share on LinkedIn">
                <img src="/assets/icons/linkedin-share.svg" alt="Share on LinkedIn" className={styles.icon} />
              </a>
              <a href="#" onClick={copyLinkToClipboard} title="Copy link">
                <img src="/assets/icons/link-square-share.svg" alt="Copy Link" className={styles.icon} />
              </a>
            </div>
          </div>
          <div className={styles.tagsAndTimeContainer}>
            <div className={styles.postTags}>
                <span className={styles.emojiIcon}>🔗</span>
                {post.tags.map((tag, index) => (
                    <a key={index} href={`/tags/${tag}`} className={styles.tag}>
                        {tag}
                    </a>
                ))}
            </div>
            <div className={styles.readingTime}>
                <span className={styles.emojiIcon}>🕜</span>
                <span>{post.estimate_time} minutes read</span>
            </div>
          </div>
          <div className={styles.contentContainer}>
            <RenderMarkdown content={post.content} />;
          </div>
          <div className={styles.commentSection}>
            <h2>LEAVE A COMMENT</h2>
            <p>
                GISCUS is a lightweight comments widget built on GitHub Discussions.
                Therefore, you need to login with your GitHub account in order to post a comment here.
                If you want to edit or remove your comments, just go to the&nbsp;
                <a 
                  href="https://github.com/ptmkhanh29/django-nextjs-blog-app-minimalist/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a> 
                &nbsp;repo discussions. If you trust Giscus, leave a comment.
            </p>
            <Giscus />
          </div>
        </div>
      </Main>
    </>
  );
};