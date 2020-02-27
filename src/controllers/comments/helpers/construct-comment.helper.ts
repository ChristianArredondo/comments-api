import { ObjectId } from "mongodb"

import { CreateCommentPayload } from "../handlers/create-comment.handler"
import { Comment } from "../../../models/comments/comment.model"

export const constructComment = ({
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