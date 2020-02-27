import { Collection, ObjectId } from "mongodb"

import { Comment } from "../../../models/comments/comment.model"

export const insertComment = async (
  coll: Collection<Comment>,
  commentToCreate: Comment
) => {
  // insert comment
  const insertionOp = await coll.insertOne(commentToCreate)

  // update parent total comments recursively
  let parentComment_id: ObjectId | null = commentToCreate.parentComment_id
  while (parentComment_id) {
    const parent = await coll.findOneAndUpdate(
      { _id: parentComment_id },
      { $inc: { totalComments: 1 } }
    )
    parentComment_id = parent.value ? parent.value.parentComment_id : null
  }

  // return new id
  return insertionOp.insertedId
}