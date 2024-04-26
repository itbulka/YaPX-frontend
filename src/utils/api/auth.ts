import { ISuccess } from "@/types/types"
import { url } from "../constants";

export interface IUserReg {
    id: string,
}

export interface IUserAuth {
    id: string,
    expiresAt: string,
    fresh: boolean,
    userId: string
}

interface ISignInData {
    nickname: string,
    password: string
}

interface ISignUpData {
    name: string,
    nickname: string,
    password: string
}

export async function signIn(form: ISignInData) {
    const res = await fetch(`${url}/sign-in`, {
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

    localStorage.setItem('userId', data.userId);
    return data as IUserAuth;
}

export async function signUp(form: ISignUpData) {
    const res = await fetch(`${url}/sign-up`, {
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

    return data as IUserReg;
}

export async function signOut() {
    const res = await fetch(`${url}/sign-out`, {
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

    return data as ISuccess;
}

export async function me() {
    const res = await fetch(`${url}/me`, {
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
            id: string
        }
    };
}