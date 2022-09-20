import { Post, User } from '../shared/interfaces';
import api from './api';

export const jsonPlaceHolderServices = {
  getUsers,
  getPosts,
};

async function getUsers(): Promise<User[]> {
  const response = await api.get<User[]>('/users');

  return response.data;
}

async function getPosts(): Promise<Post[]> {
  const response = await api.get<Post[]>('posts');
  return response.data;
}
