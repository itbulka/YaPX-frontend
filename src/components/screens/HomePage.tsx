import { Layout } from '../layout';
import Link from 'next/link';
import { getPosts } from '@/utils/api/posts';
import { useQuery } from '@tanstack/react-query';
import { Post } from '../Post/Post';

export const HomePage = () => {
    const { data: posts} = useQuery({
        queryKey: ['posts', null],
        queryFn: getPosts
    })

    return (
        <Layout>
            {
                posts?.map( (post) => {
                    return (
                        <Link key={post.id} href={`/post/${post.id}`}>
                            <Post post={post} />
                        </Link>
                    )
                })
            }
        </Layout>
    );
};
