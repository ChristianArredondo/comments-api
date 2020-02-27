import { Db } from "mongodb"
import { Response } from "express"

import { Comment } from "../../../models/comments/comment.model"
import { WithParamsAndBody } from "../../../models/api/request.model"
import { insertComment } from "../db/insert-comment.db"
import { constructComment } from "../helpers/construct-comment.helper"

export interface CreateCommentPayload {
  title?: string
  parentId?: string
  body: string
  createdByUsername: string
}
type CreateCommentRequest = WithParamsAndBody<{}, CreateCommentPayload>
export const handleCreateComment = ({ db }: { db: Db }) => async (req: CreateCommentRequest, res: Response) => {
  const commentsCollection = db.collection<Comment>('comments')
  const commentToCreate = constructComment(req.body)
  const id = await insertComment(commentsCollection, commentToCreate)
  res.status(201).send({ id })
}