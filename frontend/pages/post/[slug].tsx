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
  const res = await fetch('http://172.17.0.2:3001/posts');
  const posts = await res.json();

  // Tạo một mảng của các đối tượng `params` dựa trên slug của mỗi bài viết
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  // In ra console để debug
  console.log("Đây là các đường dẫn sẽ được tạo:", paths);

  return {
    paths,
    fallback: 'blocking'  // or false, depending on your needs
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as Params;
    const res = await fetch(`http://172.17.0.2:3001/posts?slug=${slug}`);
    const posts: PostType[] = await res.json();
    const post = posts.find(p => p.slug === slug); // Thực hiện lọc bài viết dựa trên slug

    if (!post) {
        return { notFound: true }; // Nếu không tìm thấy bài viết, trả về trang 404
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
