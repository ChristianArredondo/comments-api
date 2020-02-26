import { Db, ObjectId } from "mongodb"
import { Response } from "express"

import { Comment } from "../../../models/comments/comment.model"
import { WithParamsAndBody } from "../../../models/api/request.model"

const constructComment = ({
  parentId,
  createdByUsername,
  body,
  title
}: CreateCommentPayload): Comment => {
  const commentToCreate: Comment = {
    createdByUsername,
    body: !!body ? body : null,
    _id: new ObjectId(),
    createdDate: new Date(),
    isRoot: !parentId,
    parentComment_id: parentId ? new ObjectId(parentId) : null,
    title: !!title ? title : null,
    totalComments: 0,
  }

  return commentToCreate
}

interface CreateCommentDependencies { db: Db }
interface CreateCommentPayload {
  title?: string
  parentId?: string
  body: string
  createdByUsername: string
}
type CreateCommentRequest = WithParamsAndBody<
  {},
  CreateCommentPayload
>
export const handleCreateComment = ({ db }: CreateCommentDependencies) => async (req: CreateCommentRequest, res: Response) => {
  // init state
  const collection = db.collection<Comment>('comments')
  const commentToCreate = constructComment(req.body)

  // insert comment
  const insertionOp = await collection.insertOne(commentToCreate)

  // update parent total comments
  if (commentToCreate.parentComment_id) {
    await collection.updateOne(
      { _id: commentToCreate.parentComment_id },
      { $inc: { totalComments: 1 } }
    )
  }

  // return new id
  const id = insertionOp.insertedId
  res.status(201).send({ id })
}