import { Post, Success } from '@/models/types';
import { url } from '../constants';

export type CreatePostData = {
  text: string;
};

export async function getPosts(page: number, perPage: number) {
  const res = await fetch(`${url}/posts?page=${page}&per-page=${perPage}&with=user&with=likes`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Post[];
}

export async function createPost(form: CreatePostData) {
  const res = await fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as {
    id: string;
  };
}

export async function getPostsFollowing() {
  const res = await fetch(`${url}/followings`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Post[];
}

export async function getPostById(postId: string) {
  const res = await fetch(`${url}/posts/${postId}?with=user&with=likes`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Post;
}

export async function updatePostById(postId: string, form: CreatePostData) {
  const res = await fetch(`${url}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Post;
}

export async function deletePostById(postId: string) {
  const res = await fetch(`${url}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Success;
}

export async function addLikePost(postId: string) {
  const res = await fetch(`${url}/posts/${postId}/likes`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Success;
}

export async function removeLikePost(postId: string) {
  const res = await fetch(`${url}/posts/${postId}/likes`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Success;
}
