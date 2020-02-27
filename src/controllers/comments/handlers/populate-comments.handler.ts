import { Request } from "express"
import { Db } from "mongodb"
import { Comment } from "../../../models/comments/comment.model"


interface PopulateCommentsDependencies { db: Db }
export const handlePopulateComments = ({ db }: PopulateCommentsDependencies) => async (req: Request, res: Response) => {
  const commentsCollection = db.collection<Comment>('comments')
  commentsCollection.deleteMany({})
}