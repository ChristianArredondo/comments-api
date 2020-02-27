import { Request, Response } from "express"
import { Db, ObjectId } from "mongodb"

import { Comment } from "../../../models/comments/comment.model"
import { constructComment } from "../helpers/construct-comment.helper"
import { insertComment } from "../db/insert-comment.db"

const DEFAULT_MAX_DEPTH = 4
const DEFAULT_ROOT_COMMENTS = 5

const getRandomNum = (limit = 5) => Math.floor(Math.random() * (limit + 1))

/**
 * Inserts root comments and nested comments with
 * a random number of total children and nested levels.
 * 
 * Notes:
 *  - can be optimized using mongo `initializeUnorderedBulkOp`
 */
export const handlePopulateComments = ({ db }: { db: Db }) => async (req: Request, res: Response) => {
  const commentsCollection = db.collection<Comment>('comments')
  await commentsCollection.deleteMany({})

  const createChildrenRecursively = async (
    parentId: ObjectId,
    children: number,
    levels: number
  ) => {
    if (levels < 1) return
    for (let i = 0; i <= children; i++) {
      const id = await insertComment(
        commentsCollection,
        constructComment({
          parentId: parentId.toHexString(),
          createdByUsername: `user ${(i + 2) * (levels + 2)}`,
          body: `awesome child comment #${levels}`
        })
      )
      await createChildrenRecursively(
        id,
        getRandomNum(5),
        levels - 1
      )
    }
  }

  for (let i = 0; i <= DEFAULT_ROOT_COMMENTS; i++) {
    const parentId = await insertComment(
      commentsCollection,
      constructComment({
        createdByUsername: `user ${i + 1}`,
        title: `awesome root comment #${i + 1}`,
        body: `more info about about #${i + 1}`
      })
    )
    const totalChildren = getRandomNum(10)
    await createChildrenRecursively(
      parentId,
      totalChildren,
      DEFAULT_MAX_DEPTH
    )
  }

  res.status(201).send()
}