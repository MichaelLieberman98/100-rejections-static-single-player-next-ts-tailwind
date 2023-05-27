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

    // const newUsers = users.filter(user => function(user: User) {
    //   if (user._id === currentUser._id) {
    //     user.posts.push(newPost);
    //     return user;
    //   }
    //   return user;
    // });
    const user = users.find(user => user.id === currentUser.id);
    if (user) {
      user.posts.push(newPost);
    }

    const updateUsersResponse = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(users, null, 2), fileName: "users" })
    });
    // ^ UPDATED ALL USERS

    // allPosts.push(newPost);
    
    /*
    NOW GOTTA UPDATE THE ACTUAL 'allPosts' ARRAY...
    WILL DO LATER */

    if (updateCurrentUserResponse.ok) {
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