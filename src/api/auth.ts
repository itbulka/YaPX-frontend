import { Success } from '@/models';

import { URL } from '.';

export type UserReg = {
  id: string;
};

export type UserAuth = {
  id: string;
  expiresAt: string;
  fresh: boolean;
  userId: string;
};

type SignInData = {
  nickname: string;
  password: string;
};

type SignUpData = {
  name: string;
  nickname: string;
  password: string;
};

export async function signIn(form: SignInData) {
  const res = await fetch(`${URL}/sign-in`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = (await res.json()) as UserAuth;
  document.cookie = `auth_session=${data.id}; path=/`;

  return data;
}

export async function signUp(form: SignUpData) {
  const res = await fetch(`${URL}/sign-up`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as UserReg;
}

export async function signOut() {
  const res = await fetch(`${URL}/sign-out`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as Success;
}

export async function me() {
  const res = await fetch(`${URL}/me`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return data as {
    user: {
      id: string;
    };
  };
}
