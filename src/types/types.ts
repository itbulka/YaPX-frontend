export interface IUser {
    id: string,
    name: string,
    nickname: string,
    createdAd: string,
    followers?: IUser[],
    likedPosts?: Record<'post', IPost>[]
}

export interface IPost {
    id: string,
    text: string,
    createdAd: string,
    user?: IUser,
    likes?: Omit<IUser, 'name' | 'nickname' | 'createdAd'>
}

export interface IFolower {
    userId: string,
    followerId: string
}

export interface ISuccess {
    succes: boolean
}