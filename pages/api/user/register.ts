import type { NextApiResponse } from 'next';
import type { Api, TaboardNextRequest } from '../../../api/request';

export default function handler(
  req: TaboardNextRequest,
  res: NextApiResponse<Api['/api/user/check'][1]>,
) {
  const { name } = req.body;
  const uid = req._lobby.addUser(name);
  res.status(200).json({ name, uid });
}
