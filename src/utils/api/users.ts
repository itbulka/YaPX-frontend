import { IFolower, IPost, ISuccess, IUser } from "@/types/types"
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

export interface IEditUserData {
    name: string,
    nickname: string,
    password: string
}

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

    return data as IUser[];
}

export async function updateUser(form: IEditUserData) {
    const res = await fetch(`${url}/users`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
      },
      body: JSON.stringify(form)
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    return data as IUser;
}

export async function deleteUser() {
    const res = await fetch(`${url}/users`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    return data as ISuccess;
}

export async function getUserById(userId: string) {
    const res = await fetch(`${url}/users/${userId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    return data as IUser;
}

export async function getPostsFromUser(userId: string) {
    const res = await fetch(`${url}/users/${userId}/posts?with=user&with=likes`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    return data as IPost[];
}

export async function following(userId: string) {
    const res = await fetch(`${url}/users/${userId}/followings`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    return data as IFolower;
}

export async function unfollowing(userId: string) {
    const res = await fetch(`${url}/users/${userId}/followings`, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    return data as ISuccess;
}
