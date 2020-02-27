import { Collection } from "mongodb"

import { Comment } from "../../../models/comments/comment.model"

export const insertComment = async (
  coll: Collection<Comment>,
  commentToCreate: Comment
) => {
  // insert comment
  const insertionOp = await coll.insertOne(commentToCreate)
  // update parent total comments
  if (commentToCreate.parentComment_id) {
    await coll.updateOne(
      { _id: commentToCreate.parentComment_id },
      { $inc: { totalComments: 1 } }
    )
  }
  // return new id
  return insertionOp.insertedId
}