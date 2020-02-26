import { Db } from "mongodb"
import { Request, Response } from "express"

interface FetchCommentsDependencies {
  db: Db
}
export const handleFetchComments = ({ db }: FetchCommentsDependencies) => async (req: Request, res: Response) => {
  const collection = db.collection('comments')
  const comments = await collection.find().toArray()
  res.send(comments)
}