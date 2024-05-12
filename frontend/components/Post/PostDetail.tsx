import Link from 'next/link';
import { PostType } from './Post';
import { Main } from '../../layouts/Main';
import moment from 'moment';
type PostDetailType = {
  post: PostType;
};
export const PostDetail = ({ post }: PostDetailType) => {
  return (
    <>
      <Main>
        <div>
          {moment(post.created_at).format('DD-MM-YYYY')}
        </div>
        <div>
          {post.title}
        </div>
        <div>
          {post.content}
        </div>
      </Main>
    </>
  );
};
