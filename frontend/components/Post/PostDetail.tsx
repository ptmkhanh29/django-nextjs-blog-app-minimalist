import Link from 'next/link';
import { PostType } from './Post';
import { Main } from '../../layouts/Main';
import moment from 'moment';
import styles from '../../styles/PostDetail.module.css'; // Ensure the path is correct

type PostDetailType = {
  post: PostType;
};

export const PostDetail = ({ post }: PostDetailType) => {
  return (
    <>
      <Main>
        <div className={styles.postDetailContainer}>
          <nav aria-label={styles.Breadcrumb}>
            <ul className={styles.breadcrumb}> {/* sửa 'class' thành 'className' */}
              <li><a href="/">Home</a></li>
              <li aria-current="page">{post.title}</li>
            </ul>
          </nav>
          <div className={styles.titleContainer}>
            {post.title}
          </div>
          <div className={styles.imageContainer}>
            <img src={post.image} alt={post.title} />
          </div>
          <div className={styles.contentContainer}>
            {post.content}
          </div>
        </div>
      </Main>
    </>
  );
};
