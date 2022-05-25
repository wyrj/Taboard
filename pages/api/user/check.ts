import type { NextApiRequest, NextApiResponse } from 'next';
import type { Api } from '../../../api/request';
import lobby from '../../../server';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Api['/api/user/check'][1]>,
) {
  const { uid } = req.body;
  const name = lobby.findUser(uid);
  res.status(200).json(name ? { name, uid } : null);
}
