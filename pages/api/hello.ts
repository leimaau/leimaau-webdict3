import { NextApiRequest, NextApiResponse } from 'next'

export default function ({ req, res }: { req: NextApiRequest; res: NextApiResponse }): void {
  res.status(200).json({ text: 'Hello' })
}
