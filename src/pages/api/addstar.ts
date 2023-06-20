import type { NextApiRequest, NextApiResponse } from 'next';
import currentUser from '../../data/currentUser.json';
import allPosts from '../../data/posts.json';
import users from '../../data/users.json';
import getDateInFormat from '@/utils/getDateInFormat';

import usersToPosts from '@/utils/usersToPosts';

import { User, Post } from '../../types/types';
import { faker } from '@faker-js/faker';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { companyName, desc } = req.body;

    const userId = currentUser.id;

    let dateTimeData = getDateInFormat();

    let newPost: Post = {
      postId: faker.string.alphanumeric(8).toString(),
      companyName: companyName,
      desc: desc,
      date: dateTimeData[0],
      time: dateTimeData[1],
      timeInSeconds: Math.round((new Date().getTime() - new Date('2000-01-01T12:00:00').getTime()) / 1000),
      userId: userId
    }

    console.log("newPost", newPost);

    const updateCurrentPostResponse = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(newPost, null, 2), fileName: "currentPost" })
    });
    // ^ UPDATED CURRENT USER

    let tempUser: User = currentUser;

    tempUser.posts.push(newPost);
    
    console.log("currentUser posts", currentUser.posts);

    const updateCurrentUserResponse = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(tempUser, null, 2), fileName: "currentUser" })
    });
    // ^ UPDATED CURRENT USER

    let newUsers = users.map(user => user.id === tempUser.id ? tempUser : user);

    const updateUsersResponse = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(newUsers, null, 2), fileName: "users" })
    });
    // ^ UPDATED ALL USERS

    let newPosts = [...allPosts];
    newPosts.unshift(newPost);
    
    const updatePostsResponse = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(newPosts, null, 2), fileName: "posts" })
    });
    // ^ UPDATED ALL POSTS

    if (updateCurrentPostResponse.ok && updateCurrentUserResponse.ok && updateUsersResponse.ok && updatePostsResponse.ok) {
      console.log("data appended to file");
    } else {
      console.error("An error occurred");
    }

    res.status(200).json({ message: 'Logout successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
/*
Argument of type 
'{post_id: number; 
  company_name: any; 
  desc: any; 
  date: string; 
  time: string; 
  userId: number; 
}' 
is not assignable to parameter of type 
'{post_id: number; 
  company_name: string; 
  desc: string; 
  date: string; 
  time: string; 
  userId: number; 
  id: number; 
  userInfo: { 
    _id: number; 
    email: string; 
    first_name: string; 
    last_name: string; 
  }; 
}'. */