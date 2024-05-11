import { PostDetail, PostType } from '../../components/Post';
import { useRouter } from 'next/router';
import JSON_POSTS from '../../public/data/posts.json';
import { useEffect, useState } from 'react';

export default function DetailArticle() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<PostType>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true);
    const dataPost = JSON_POSTS.find(
      (item) => item.slug === slug?
    );
    setPost(dataPost);
    setLoading(false);
  }, [router.isReady]);

  if (isLoading) return <p>Loading...</p>;

  return <>{post !== undefined ? <PostDetail post={post} /> : ''}</>;
}
