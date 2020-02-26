import { Db, ObjectId } from "mongodb"
import { Response } from "express"

import { Comment } from "../../../models/comments/comment.model"
import { WithParamsAndQuery } from "../../../models/api/request.model"

const DEPTH_LIMIT = 3
const CHILDREN_LIMIT = 5

// Consideration: set max allowable limit (for performance)
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
        $limit: childrenLimit
      }
    ]
  }

  if (--depthLimit) $lookup.pipeline.push(get$LookupStageRecursive(depthLimit, childrenLimit))

  return { $lookup }
}

interface FetchSingleCommentDependencies { db: Db }
type FetchSingleCommentRequest = WithParamsAndQuery<
  {
    commentId: string
  },
  {
    depthLimit: string
    childrenLimit: string
  }
>

const getAsNumOrDefault = (maybeStringNum: string, defaultVal: number) => {
  if (!maybeStringNum) return defaultVal
  const asInt = parseInt(maybeStringNum, 10)
  return !isNaN(asInt) ? asInt : defaultVal
}

export const handleFetchSingleComment = ({ db }: FetchSingleCommentDependencies) => async (req: FetchSingleCommentRequest, res: Response) => {
  // init state
  const collection = db.collection<Comment>('comments')
  const { commentId } = req.params
  const { depthLimit, childrenLimit } = req.query
  const depthLimitNum = getAsNumOrDefault(depthLimit, DEPTH_LIMIT)
  const childrenLimitNum = getAsNumOrDefault(childrenLimit, CHILDREN_LIMIT)

  // build pipeline
  const $match: any = { _id: new ObjectId(commentId) }
  const pipeline: any = [{ $match }]
  if (depthLimitNum > 0) pipeline.push(get$LookupStageRecursive(depthLimitNum, childrenLimitNum))

  // fetch
  const [commentWithChildren] = await collection
    .aggregate(pipeline)
    .toArray()

  // return
  res.send(commentWithChildren)
}
