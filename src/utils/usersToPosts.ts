import { User, Post } from '../types/types';

export default function usersToPosts(users: User[]) {
  let posts: Post[] = [];
  let id: number = 1;

  users.forEach(user => {
    user.posts.forEach(post => {
      posts.push({
        ...post
      });
    });
  });

  posts.sort((postA, postB) => postA.timeInSeconds - postB.timeInSeconds);

  return posts;
}