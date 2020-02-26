import { Db, ObjectId } from "mongodb"
import express from 'express'

import { handleFetchComments } from "./handlers/fetch-comments.handler"
import { handleFetchSingleComment } from './handlers/fetch-single-comment.handler'
import { handleCreateComment } from "./handlers/create-comment.handler"
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
      [
        // check target id
        {
          collectionName: 'comments',
          buildQueryFromReq: req => ({ _id: new ObjectId(req.params.commentId) })
        }
      ]
    ),
    handleFetchSingleComment({ db })
  )

  // POST single
  router.post(
    '/',
    ensureDataExistsMiddleware(
      db,
      [
        // referential integrity check
        {
          collectionName: 'comments',
          buildQueryFromReq: req => req.body.parentId
            ? { _id: new ObjectId(req.body.parentId) }
            : null
        }
      ],
      400
    ),
    handleCreateComment({ db })
  )

  return router
}