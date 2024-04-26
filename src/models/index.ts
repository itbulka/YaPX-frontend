export type User = {
  id: string;
  name: string;
  nickname: string;
  createdAd: string;
  followers?: User[];
  likedPosts?: {
    post: {
      id: string;
      text: string;
      createdAt: string;
    };
  }[];
};

export type Post = {
  id: string;
  text: string;
  createdAt: string;
  user?: User;
  likes?: { user: { id: string } }[];
};

export type Follower = {
  userId: string;
  followerId: string;
};

export type Success = {
  success: boolean;
};
