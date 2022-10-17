import { NextApiRequest, NextApiResponse } from 'next'

// localhost:3000/api/polls/{id}/publish ["PUT"]
// localhost:3000/api/polls/{id} ["GET", "PUT", "DELETE"]
// localhost:3000/api/polls ["GET", "POST"]
// localhost:3000/api/polls/{id}/questions ["GET", "PUT", "DELETE", "POST"]

// localhost:3000/api/questions ["GET", "PUT", "DELETE", "POST"]
// req.body => pollsId

// localhost:3000/api/votes ["GET", "POST"]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      // TODO: Get poll by id
      // TODO: Return poll with questions
      return res.status(200).json({})
    case 'post':
      // TODO: Get poll by id
      // TODO: Add question to poll
      // TODO: Return poll with added questions
      return res.status(201).json({})
    case 'put':
      // TODO: Get poll by id
      // TODO: Updates question in poll
      // TODO: Return poll with updated questions
      return res.status(201).json({})
    case 'delete':
      // TODO: Get poll by id
      // TODO: Delete poll
      return res.status(204).json({})
    default:
      return res.status(400).json({
        success: false,
        error: 'Method not allowed',
      })
  }
}
