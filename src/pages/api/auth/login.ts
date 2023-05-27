import { User } from "../../../types/types";
import type { NextApiRequest, NextApiResponse } from 'next';

import users from '../../../data/users.json';
import currentUser from '../../../data/currentUser.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body);

  if (req.method === 'POST') {
    const { email, password } = req.body;

    let validUsers = users.filter(obj => obj.email === email);

    if (validUsers.length !== 1) {
      // tell frontend that they have the wrong email
      res.status(401).json( {message: 'Invalid email' });
      return;
    }

    let user: User = validUsers[0];

    if (user.password !== password) {
      // tell frontend that they have the wrong password
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    const response = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(user, null, 2), fileName: "currentUser" })
    });

    if (response.ok) {
      console.log("data appended to file");
    } else {
      console.error("An error occurred");
    }

    res.status(201).json({ message: 'Login Successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
    console.log("method not allowed");
  }
}

// const emailExists = users.some(user => user.email === email);
    // const passwordExists = users.some(user => user.password === password);
    // if (emailExists || passwordExists) {
    //   alert("Email or password incorrect");
    //   return;
    // }