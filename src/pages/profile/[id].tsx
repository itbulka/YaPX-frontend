import { Post } from "@/components/Post/Post";
import { Layout } from "@/components/layout";
import MessageForm from "@/components/message-form";
import { useUserStatus } from "@/slice/zustand";
import { getPostsFromUser, getUserById } from "@/utils/api/users";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Profile() {
  const router = useRouter();
  const id = router.query.id as string;

  const userId = useUserStatus(state => state.userId);
    const [isFollowing, setFollowing] = useState(false);

    const {data: user, status} = useQuery({
        queryKey: ['user', null, id],
        queryFn: async () => getUserById(id)
    })

    const {data: posts} = useQuery({
        queryKey: ['postsUser', null, id],
        queryFn: async () => getPostsFromUser(id)
    })

    useEffect(() => {
        setFollowing(user?.followers?.find( follower => follower.id === userId) ? true : false);
    }, [userId, user])

    return (
        <Layout>
            {status === 'pending' ? 'Loading' : null}

            {status === 'success' ? (
                <div className="w-full">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-[4px]">
                            <h2 className="text-xl font-semibold text-stone-950">{user?.nickname ?? 'anonymous'}</h2>
                            <p className="text-xs text-slate-800">{user?.name ?? 'anonymous'}</p>
                        </div>
                        <p className="text-sm fonst-regular">{`${user?.followers?.length ?? 0} followers`}</p>
                        <p className="text-sm fonst-regular">{`${posts?.length ?? 0} posts`}</p>
                    </div>
                    { 
                        !(userId === id) 
                            ? <button className="transition ease-in-out duration-300 py-[2px] px-[6px] border border-black rounded-tl-lg rounded-br-lg hover:transition-colors hover:bg-black hover:text-white" disabled={ userId ? false : true}>{isFollowing ? 'Отписаться' : 'Подписаться'}</button>
                            : <Link href={'/settings'} className="transition ease-in-out duration-300 py-[2px] px-[6px] border border-black rounded-tl-lg rounded-br-lg hover:transition-colors hover:bg-black hover:text-white">Настройки</Link>
                    }
                </div>
                <div className="w-full h-[1px] bg-stone-400 my-[16px]"></div>
                <div className="flex flex-col items-center gap-4">
                { userId === id ? <MessageForm /> : null}
                    {
                        posts?.map( (post) => {
                            return (
                                <Link key={post.id} href={`/post/${post.id}`}>
                                    <Post post={post} />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
            ) : null}
        </Layout>
    );
}