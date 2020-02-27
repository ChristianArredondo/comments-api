import { Db } from "mongodb"
import { Response } from "express"
import { Comment } from "../../../models/comments/comment.model"
import { WithParamsAndQuery } from "../../../models/api/request.model"
import { findManyComments } from "../db/find-many-comments.db"

export interface FetchCommentsQuery {
  root?: string
  sortBy?: string
  sortDir?: string
  page?: string
}
export type FetchCommentsRequest = WithParamsAndQuery<{}, FetchCommentsQuery>
export const handleFetchComments = ({ db }: { db: Db }) => async (req: FetchCommentsRequest, res: Response) => {
  const collection = db.collection<Comment>('comments')
  const comments = await findManyComments(collection, req.query)
  res.send(comments)
}