import { Db } from "mongodb"
import { Response } from "express"

import { Comment } from "../../../models/comments/comment.model"
import { WithParamsAndQuery } from "../../../models/api/request.model"
import { findSingleComment } from "../db/find-single-comment.db"


export type FetchSingleCommentRequest = WithParamsAndQuery<
  { commentId: string },
  { depthLimit: string; childrenLimit: string }
>
export const handleFetchSingleComment = ({ db }: { db: Db }) => async (req: FetchSingleCommentRequest, res: Response) => {
  const collection = db.collection<Comment>('comments')
  const { commentId } = req.params
  const { depthLimit, childrenLimit } = req.query
  const commentWithChildren = await findSingleComment(
    collection,
    commentId,
    depthLimit,
    childrenLimit
  )
  res.send(commentWithChildren)
}
