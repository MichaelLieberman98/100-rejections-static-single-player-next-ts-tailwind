import type { NextApiRequest, NextApiResponse } from "next";
import { User } from '../../types/types';

import currentUser from '../../data/currentUser.json';
import users from '../../data/users.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log("inside editProfilePic, req", req);
    const { profilePic } = req.body;

    let tempUser: User = currentUser;
    let tempUsers: User[] = users;

    let newUser: User = {
      ...tempUser,
      profilePic: profilePic
    };

    console.log("new User profile pic", newUser);

    const updateCurrentUser = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(newUser, null, 2), fileName: "currentUser" })
    });

    let newUsers: User[] = tempUsers.map(user => user.profilePic === newUser.profilePic ? newUser : user);

    const updateAllUsers = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(newUsers, null, 2), fileName: "users" })
    });

    if (updateCurrentUser.ok && updateAllUsers.ok) {
      console.log("user profile pic updated successfully");
    } else {
      console.log("user profile pic not updated successfully");
    }

    res.status(200).json({ message: "User profile pic updated" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}