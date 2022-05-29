import type { NextApiRequest, NextApiResponse } from 'next';
import type { Api } from '../../../api/request';
import lobby from '../../../server';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Api['/api/room/create'][1]>,
) {
  const roomId = lobby.createPokerRoom();
  res.status(200).json(roomId);
}
