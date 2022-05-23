import type { NextApiRequest, NextApiResponse } from 'next';
import lobby from '../../../server';

type Data = {
  name: string,
  uid: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.body;
  const uid = lobby.addUser(name);
  res.status(200).json({ name, uid });
}
