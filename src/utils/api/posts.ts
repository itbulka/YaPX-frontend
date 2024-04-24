import { IPost, ISuccess } from "@/types/types";
import { url } from "../constants";

export interface ICreatePostData {
    text: string
}

export async function getPosts() {
    const res = await fetch(`${url}/posts`, {
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

export async function createPost(form: ICreatePostData) {
    const res = await fetch(`${url}/posts`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
      },
      body: JSON.stringify(form)
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    return data as {
        id: string
    };
}

export async function getPostsFollowing() {
    const res = await fetch(`${url}/followings`, {
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

export async function getPostById(postId: string) {
    const res = await fetch(`${url}/posts/${postId}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    return data as IPost;
}

export async function updatePostById(postId: string, form: ICreatePostData) {
    const res = await fetch(`${url}/posts/${postId}`, {
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

    return data as IPost;
}

export async function deletePostById(postId: string) {
    const res = await fetch(`${url}/posts/${postId}`, {
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

export async function addLikePost(postId: string) {
    const res = await fetch(`${url}/posts/${postId}/likes`, {
      method: 'POST',
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

export async function removeLikePost(postId: string) {
    const res = await fetch(`${url}/posts/${postId}/likes`, {
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