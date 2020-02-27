import { Collection, ObjectId } from "mongodb"
import { Comment } from "../../../models/comments/comment.model"
import { getAsNumOrDefault } from "../helpers/get-as-num-or-default.helper"

const DEFAULT_DEPTH_LIMIT = 3
const DEFAULT_CHILDREN_LIMIT = 5

/**
 * Recursivesly adds $lookup stage for nested comments
 * 
 * Considerations:
 *  - set max allowable limits (for performance)
 */
const get$LookupStageRecursive = (depthLimit: number, childrenLimit: number) => {
  const $lookup: any = {
    from: 'comments',
    let: { id: '$_id' },
    as: 'children',
    pipeline: [
      {
        $match: {
          $expr: {
            $and: [{ $eq: ['$parentComment_id', '$$id'] }]
          }
        }
      },
      {
        $limit: childrenLimit > 0 ? childrenLimit : 1
      }
    ]
  }

  if (--depthLimit) $lookup.pipeline.push(get$LookupStageRecursive(depthLimit, childrenLimit))

  return { $lookup }
}

export const findSingleComment = async (
  coll: Collection<Comment>,
  commentId: string,
  depthLimit: string | undefined,
  childrenLimit: string | undefined
) => {
  const depthLimitNum = getAsNumOrDefault(depthLimit, DEFAULT_DEPTH_LIMIT)
  const childrenLimitNum = getAsNumOrDefault(childrenLimit, DEFAULT_CHILDREN_LIMIT)

  // build pipeline
  const $match: any = { _id: new ObjectId(commentId) }
  const pipeline: any = [{ $match }]
  if (depthLimitNum > 0) pipeline.push(get$LookupStageRecursive(depthLimitNum, childrenLimitNum))

  // fetch
  const [commentWithChildren] = await coll.aggregate(pipeline).toArray()

  return commentWithChildren
}