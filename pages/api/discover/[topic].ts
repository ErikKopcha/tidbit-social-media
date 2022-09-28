import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { topicPostsQuery } from '../../../utils/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const { topic } = req.query;

      if (topic) {
        const videosQuery = topicPostsQuery(topic);
        const videos = await client.fetch(videosQuery);

        res.status(200).json(videos)
      } else {
        res.status(200).json([]);
      }

      break;
  }
}
