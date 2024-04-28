import { Follower, Post, Success, User } from '@/models';

import { URL } from '.';
import { useAuthStore } from '@/store/auth';

export type UserReg = {
  id: string;
};

export type UserAuth = {
  id: string;
  expiresAt: string;
  fresh: boolean;
  userId: string;
};

export type EditUserData = {
  name: string;
  nickname: string;
  password: string;
};

export async function getUsers() {
  const res = await fetch(`${URL}/users`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as User[];
}

export async function updateUser(form: EditUserData) {
  const res = await fetch(`${URL}/users`, {
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

  return data as User;
}

export async function deleteUser() {
  const res = await fetch(`${URL}/users`, {
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

export async function getUserById(userId: string) {
  const res = await fetch(`${URL}/users/${userId}?with=followers`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as User;
}

export async function getPostsFromUser(userId: string) {
  const res = await fetch(
    `${URL}/users/${userId}/posts?page=1&per-page=15&sort=desc&with=user&with=likes`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Post[];
}

export async function following(userId: string, auth: string) {
  const res = await fetch(`${URL}/users/${userId}/followings`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Follower;
}

export async function unFollowing(userId: string, auth: string) {
  const res = await fetch(`${URL}/users/${userId}/followings`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Success;
}
