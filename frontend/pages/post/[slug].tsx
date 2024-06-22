import { PostDetail, PostType } from '../../components/Post';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import fetch from 'node-fetch';
import moment from 'moment';

type PostDetailPageType = {
  post: PostType;
};

type Params = ParsedUrlQuery & {
  slug: string;
};
function preprocessContent(content) {
  // Loại bỏ thẻ <p> mở và đóng
  return content.replace(/<\/?p>/g, '');
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://backend:3001/api/articles/');
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  console.log("This urls will be created: ", paths);

  return {
    paths,
    fallback: 'blocking'  // or false, depending on your needs
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as Params;
    const res = await fetch(`http://backend:3001/api/articles/?slug=${slug}`);
    const posts: PostType[] = await res.json();
    const post = posts.find(p => p.slug === slug);
    const formattedDate = moment(post.created_at).format('MMM D, YYYY');

    if (!post) {
        return { notFound: true }; 
    }

    return {
    props: {
      post: {
        ...post,
        formattedDate,
      },
    },
  };
};


export default function DetailPost({ post }: PostDetailPageType) {
  const processedContent = preprocessContent(post.content);
  return (
    <>
      <PostDetail post={{ ...post, content: processedContent }} />
    </>
  );
}