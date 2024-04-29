import { Post, Success } from '@/models';

import { URL } from '.';
import { useAuthStore } from '@/store/auth';

export type CreatePostData = {
  text: string;
};

export async function getPosts(page: number, perPage: number) {
  const res = await fetch(`${URL}/posts?page=${page}&per-page=${perPage}&with=user&with=likes`, {
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
  const res = await fetch(`${URL}/posts`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer ' + useAuthStore.getState().sessionId ?? '',
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

export async function getPostsFollowing(page: number, perPage: number) {
  const res = await fetch(`${URL}/posts/followings?page=${page}&per-page=${perPage}&with=user&with=likes`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer ' + useAuthStore.getState().sessionId ?? '',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Post[];
}

export async function getPostById(postId: string) {
  const res = await fetch(`${URL}/posts/${postId}?with=user&with=likes`, {
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
  const res = await fetch(`${URL}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',     
      authorization: 'Bearer ' + useAuthStore.getState().sessionId ?? '',
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
  const res = await fetch(`${URL}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer ' + useAuthStore.getState().sessionId ?? '',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Success;
}

export async function addLikePost(postId: string) {
  const res = await fetch(`${URL}/posts/${postId}/likes`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer ' + useAuthStore.getState().sessionId ?? '',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Success;
}

export async function removeLikePost(postId: string) {
  const res = await fetch(`${URL}/posts/${postId}/likes`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer ' + useAuthStore.getState().sessionId ?? '',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Success;
}
