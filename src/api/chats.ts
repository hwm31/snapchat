import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const chats = [
    { id: 1, message: '안녕하세요!', roomId: '1' },
    { id: 2, message: '새로운 메시지가 있습니다.', roomId: '2' },
    { id: 3, message: '채팅 메시지를 확인하세요.', roomId: '3' },
  ];

  res.status(200).json(chats);
}