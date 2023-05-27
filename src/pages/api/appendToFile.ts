import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("at appendToFile");
    // console.log(req.body);
    const { data, fileName } = req.body;
    console.log("appendToFile stuff", data, fileName);

    let map = new Map();
    map.set("allPosts", path.join(process.cwd(), 'src', 'data', 'allPosts.json'));
    map.set("users", path.join(process.cwd(), 'src', 'data', 'users.json'));
    map.set("currentUser", path.join(process.cwd(), 'src', 'data', 'currentUser.json'));
    map.set("currentPost", path.join(process.cwd(), 'src', 'data', 'currentPost.json'));
    console.log(map);
    
    let officialPath = map.get(fileName);
    console.log(officialPath);
  
    // Append the data to the file
    fs.writeFileSync(officialPath, data);
  
    res.status(200).send('Data written to file');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};