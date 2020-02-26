import { Db, ObjectId } from "mongodb"
import express from 'express'
import { handleFetchComments } from "./handlers/fetch-comments.handler"
import { handleFetchSingleComment } from './handlers/fetch-single-comment.handler'
import { ensureDataExistsMiddleware } from "../../middleware/ensure-data-exists.middleware"

export const commentsController = (db: Db) => {
  const router = express.Router()

  // GET many
  router.get(
    '/',
    handleFetchComments({ db })
  )

  // GET single
  router.get(
    '/:commentId',
    ensureDataExistsMiddleware(
      db,
      [{
        collectionName: 'comments',
        buildQueryFromReq: req => ({ _id: new ObjectId(req.params.commentId) })
      }]
    ),
    handleFetchSingleComment({ db })
  )

  return router
}