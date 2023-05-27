import fs from 'fs';
import { User, Post } from "../../../types/types";
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { faker } from '@faker-js/faker';

import users from '../../../data/users.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.body);
  // console.log("users type = ", users);

  if (req.method === 'POST') {
    const { email, firstName, lastName, password } = req.body;

    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      alert("Email already exists");
      return;
    }

    // THIS NEEDS TO BE REDONE BC IN REALITY YOU CAN'T TELL A USER THAT THE PASSWORD 
    // THEY ARE TRYING TO USE IS FROM ANOTHER USE AS THIS IS A SECURITY ISSUE
    const passwordExists = users.some(user => user.password === password);
    if (passwordExists) {
      alert("Password already exists");
      return;
    }

    let posts: Post[] = [];

    let newUser: User = {
      id: faker.string.alphanumeric(8),
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      posts: posts,
    };

    users.push(newUser);

    // const bodyContent = { users, "users" }

    const response = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(users, null, 2), fileName: "users" })
    });

    if (response.ok) {
      console.log("data appended to file");
    } else {
      console.error("An error occurred");
    }

    // fs.writeFileSync(officialPath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User created ' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
    console.log("method not allowed");
  }
}