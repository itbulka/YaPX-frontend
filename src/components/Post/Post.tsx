import { IPost } from "@/types/types"

type Props = {
    post: IPost
}

export const Post = (prop: Props) => {

    const { post } = prop;

    return (
        <article className="w-96 rounded-md p-4 shadow">
            <h1 className="text-sm text-stone-400">{post.user?.name ?? 'anonymous'}</h1>
            <p className="">{post.text}</p>
            <div className="flex gap-2 items-center justify-end">
              <p className="text-sm text-stone-400">{`${post.likes?.length ?? 0} likes`}</p>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </button>
            </div>
          </article>
    )
}
