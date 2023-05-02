import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import path from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'currentUser.json')
  const jsonData = await fs.readFile(filePath, 'utf-8')
  const data = JSON.parse(jsonData)
  res.status(200).json(data.users)
}