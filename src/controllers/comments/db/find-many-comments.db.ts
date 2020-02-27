import { Collection } from "mongodb"

import { FetchCommentsQuery } from "../handlers/fetch-comments.handler"
import { Comment } from "../../../models/comments/comment.model"

const PAGE_LIMIT = 5

export interface FetchCommentsMatch { isRoot?: boolean }
export type FetchCommentsSort = { [key in keyof Partial<Comment>]: 1 | -1 }

export const findManyComments = async (
  coll: Collection<Comment>,
  query: FetchCommentsQuery
) => {
  const { root, sortBy, sortDir, page } = query

  // query
  const $match: FetchCommentsMatch = {}
  if (root) {
    if (root === 'true') $match.isRoot = true
    else if (root === 'false') $match.isRoot = false
  }

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

  const comments = await coll.aggregate([
    { $match },
    { $sort },
    { $skip },
    { $limit }
  ]).toArray()

  return comments
}