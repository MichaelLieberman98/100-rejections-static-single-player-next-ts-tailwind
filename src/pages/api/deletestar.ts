import type { NextApiRequest, NextApiResponse } from 'next';
import { User, Post } from '../../types/types';
import currentUser from '../../data/currentUser.json';
import users from '../../data/users.json';
import posts from '../../data/posts.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log("inside deletestar, req", req);
    const { postId } = req.body;

    let tempUsers: User[] = users;

    let tempUser: User = currentUser;

    let tempPosts: Post[] = posts;

    let deletedPost: Post = tempUser.posts.filter(post => post.postId === postId)[0];
    let validPosts: Post[] = tempUser.posts.filter(post => post.postId !== postId);

    let newPost: Post = {
      ...deletedPost,
      postId: ""
    };

    console.log("inside deletestar, newPost", newPost);

    const updateCurrentPost = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(newPost, null, 2), fileName: "currentPost" })
    });

    tempUser.posts = validPosts;

    console.log("inside deletestar, tempUser", tempUser);

    const updateCurrentUser = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(tempUser, null, 2), fileName: "currentUser" })
    });

    tempUsers = users.map(user => user.id === tempUser.id ? tempUser : user );

    console.log("inside deletestar, tempUsers: ", tempUsers);

    console.log("tempUsers", tempUsers);
    const updateAllUsers = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(tempUsers, null, 2), fileName: "users" })
    });

    let newPosts = tempPosts.filter(post => post.postId !== postId);

    const updateAllPosts = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(newPosts, null, 2), fileName: "posts" })
    });

    if (updateCurrentPost.ok && updateCurrentUser.ok && updateAllUsers.ok && updateAllPosts.ok) {
      console.log("post deleted successfully!");
    } else {
      console.log("post not deleted successfully!");
    }

    res.status(200).json({ message: "delete success!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}