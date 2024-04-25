import { Layout } from "@/components/layout";
import { useRouter } from "next/router";
import { Post} from "@/components/Post/Post";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/utils/api/posts";

export default function PostId() {
  const router = useRouter();
  const id = router.query.id;

  const { data: posts, status } = useQuery({
    queryKey: ['posts', null, id],
    queryFn: async () => getPostById(id as string)
  });

  return (
    <Layout>
      <div className="flex flex-col gap-5">
        {status === 'pending' ? 'Loading' : null}

        {status === 'success' ? (
          <div className='max-w-5xl rounded-md p-4 shadow gap-2 flex flex-col'>
            
              <div className='hover:bg-slate-100'>
                <Post post={posts} />
              </div>
            
          </div>
        ) : null}
      </div>
    </Layout>
  );
}