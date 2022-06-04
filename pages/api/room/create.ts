import type { NextApiResponse } from 'next';
import type { Api, TaboardNextRequest } from '../../../api/request';

export default function handler(
  req: TaboardNextRequest,
  res: NextApiResponse<Api['/api/room/create'][1]>,
) {
  const roomId = req._lobby.createPokerRoom();
  res.status(200).json(roomId);
}
