import { Post } from '../../components/Post';
import { Main } from '../../layouts/Main';

export default function Posts({ posts }) {
  return (
    <>
      <Main>
        <div>
          <Post posts={posts} />
        </div>
      </Main>
    </>
  );
}
