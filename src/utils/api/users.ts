import { Follower, Post, Success, User } from '@/models/types';
import { url } from '../constants';

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
  const res = await fetch(`${url}/users`, {
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
  const res = await fetch(`${url}/users`, {
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

  return data as User;
}

export async function deleteUser() {
  const res = await fetch(`${url}/users`, {
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

export async function getUserById(userId: string) {
  const res = await fetch(`${url}/users/${userId}`, {
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
    `${url}/users/${userId}/posts?page=1&per-page=15&sort=desc&with=user&with=likes`,
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

export async function following(userId: string) {
  const res = await fetch(`${url}/users/${userId}/followings`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Follower;
}

export async function unfollowing(userId: string) {
  const res = await fetch(`${url}/users/${userId}/followings`, {
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
