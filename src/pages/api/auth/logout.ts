import type { NextApiRequest, NextApiResponse } from 'next';
import currentUser from '../../../data/currentUser.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Perform logout logic here
    currentUser.id = "";

    const response = await fetch('http://localhost:3000/api/appendToFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: JSON.stringify(currentUser, null, 2), fileName: "currentUser" })
    });

    if (response.ok) {
      console.log("data appended to file");
    } else {
      console.error("An error occurred");
    }

    res.status(200).json({ message: 'Logout successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
