import type { NextApiRequest, NextApiResponse } from 'next';
import type { Api } from '../../../api/request';
import lobby from '../../../server';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Api['/api/user/check'][1]>,
) {
  const { name } = req.body;
  const uid = lobby.addUser(name);
  res.status(200).json({ name, uid });
}
