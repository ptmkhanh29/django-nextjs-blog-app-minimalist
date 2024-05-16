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
          <div className={styles.titleContainer}>
            {post.title}
          </div>
          <div className={styles.imageContainer}>
            <img src="/assets/images/post3.png" alt="Post image" />
          </div>
          <div className={styles.contentContainer}>
            {post.content}
          </div>
        </div>
      </Main>
    </>
  );
};
