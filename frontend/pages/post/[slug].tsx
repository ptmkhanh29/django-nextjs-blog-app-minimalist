import { PostDetail, PostType } from '../../components/Post';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import fetch from 'node-fetch';

type PostDetailPageType = {
  post: PostType;
};

type Params = ParsedUrlQuery & {
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch the list of posts from the API
  const res = await fetch('http://127.0.0.1:3001/posts');
  const posts: PostType[] = await res.json();

  // Generate the paths for each post based on the slug
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }));
  console.log(paths); // Check what paths are being returned
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;

  // Fetch the post details from the API using the slug
  const res = await fetch(`http://127.0.0.1:3001/posts?slug=${slug}`);
  const posts: PostType[] = await res.json();
  const post = posts[0];
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
