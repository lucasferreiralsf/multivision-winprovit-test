import { Post, User, UserPosts } from '../interfaces';
import { parseAddress } from './parse-address.helper';

export function getUserPosts({
  users,
  posts,
}: {
  users: User[];
  posts: Post[];
}) {
  const data: UserPosts[] = [];
  if (users && posts) {
    for (const { id, address, company, ...restUser } of users) {
      data.push({
        id,
        ...restUser,
        address: parseAddress(address),
        company: company.name,
        posts: posts.filter((post) => post.userId === id),
      });
    }
  }
  return data;
}
