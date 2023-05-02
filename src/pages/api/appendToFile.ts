import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("at server");
    // console.log(req.body);
    const { data, filePath } = req.body;
    // console.log(data, path);

    const officialPath = path.join(process.cwd(), 'src', 'data', 'allPosts.json');
  
    // Append the data to the file
    fs.writeFileSync(officialPath, data);
  
    res.status(200).send('Data written to file');
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
};