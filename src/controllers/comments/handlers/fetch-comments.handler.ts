import { Db } from "mongodb"
import { Request, Response } from "express"
import { Comment } from "../../../models/comments/comment.model"
import { WithParamsAndQuery } from "../../../models/api/request.model"

const PAGE_LIMIT = 5

interface FetchCommentsDependencies { db: Db }
interface FetchCommentsMatch { isRoot?: boolean }
type FetchCommentsSort = { [key in keyof Partial<Comment>]: 1 | -1 }
type FetchCommentsRequest = WithParamsAndQuery<
  {},
  {
    isRoot?: string
    sortBy?: string
    sortDir?: string
    page?: string
  }
>
export const handleFetchComments = ({ db }: FetchCommentsDependencies) => async (req: FetchCommentsRequest, res: Response) => {
  const collection = db.collection<Comment>('comments')
  const { isRoot, sortBy, sortDir, page } = req.query

  // query
  const $match: FetchCommentsMatch = {}
  if (isRoot) $match.isRoot = req.query.isRoot === 'true'

  // sort
  let $sort: FetchCommentsSort = { _id: -1 }
  if (sortBy && sortDir) {
    const int = parseInt(sortDir, 10)
    if (int === 1 || int === -1) $sort = { [sortBy]: int }
  }

  // pagination
  let $skip = 0
  if (page) {
    const skipNum = parseInt(page, 10)
    if (skipNum) $skip = (skipNum * PAGE_LIMIT) - PAGE_LIMIT
  }

  // limit
  const $limit = PAGE_LIMIT

  const comments = await collection.aggregate([
    { $match },
    { $sort },
    { $skip },
    { $limit }
  ]).toArray()
  res.send(comments)
}