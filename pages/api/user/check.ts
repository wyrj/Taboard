import type { NextApiResponse } from 'next';
import type { Api, TaboardNextRequest } from '../../../api/request';

export default function handler(
  req: TaboardNextRequest,
  res: NextApiResponse<Api['/api/user/check'][1]>,
) {
  const { uid } = req.body;
  const name = req._lobby.findUser(uid);
  res.status(200).json(name ? { name, uid } : null);
}
