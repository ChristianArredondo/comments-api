import { Db, ObjectId } from "mongodb"
import express, { Request } from 'express'

import { handleFetchComments } from "./handlers/fetch-comments.handler"
import { handleFetchSingleComment } from './handlers/fetch-single-comment.handler'
import { handleCreateComment } from "./handlers/create-comment.handler"
import { ensureDataExistsMiddleware } from "../../middleware/ensure-data-exists.middleware"
import { requestValidatorMiddleware } from "../../middleware/request-validator.middleware"
import { createRootCommentSchema, createChildCommentSchema } from "./validation/create-comment.validation"

export const commentsController = (db: Db) => {
  const router = express.Router()
  const commentsCollName = 'comments'

  // GET many
  router.get(
    '/',
    handleFetchComments({ db })
  )

  // GET single
  const verifyTargetExists = (req: Request) => ({ _id: new ObjectId(req.body.parentId) })
  router.get(
    '/:commentId',
    ensureDataExistsMiddleware(
      db,
      [{ collectionName: commentsCollName, buildQueryFromReq: verifyTargetExists }]
    ),
    handleFetchSingleComment({ db })
  )

  // POST single root comment
  router.post('/root',
    requestValidatorMiddleware(createRootCommentSchema),
    handleCreateComment({ db })
  )

  // POST single child comment
  const refIntegrityCheckParent = (req: Request) => ({ _id: new ObjectId(req.body.parentId) })
  router.post(
    '/child',
    requestValidatorMiddleware(createChildCommentSchema),
    ensureDataExistsMiddleware(
      db,
      [{ collectionName: commentsCollName, buildQueryFromReq: refIntegrityCheckParent }]
    ),
    handleCreateComment({ db })
  )

  return router
}