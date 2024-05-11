import { PostDetail, PostType } from '../../components/Post';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import JSON_POSTS from '../../public/data/posts.json';

type PostDetailPageType = {
  post: PostType;
};

type Params = ParsedUrlQuery & {
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = JSON_POSTS.map(post => ({
    params: { slug: post.slug }
  }));
  console.log(paths); // Check what paths are being returned
  return { paths, fallback: false };
};



export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;
  const post = JSON_POSTS.find(post => post.slug === slug);
  console.log(slug, post); // Debug to see if the slug and post are correct

  if (!post) {
    return { notFound: true }; // This will show a 404 page if no post is found
  }

  return {
    props: { post },
  };
};



export default function DetailPost({ post }: PostDetailPageType) {
  return (
    <>
      <PostDetail post={post} />
    </>
  );
}
