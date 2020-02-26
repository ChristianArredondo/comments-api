import { Db } from "mongodb"
import express from 'express'
import { handleFetchComments } from "./handlers/fetch-comments.handler"
import { handleFetchSingleComment } from './handlers/fetch-single-comment.handler'

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
    // TODO. 404 middleware
    handleFetchSingleComment({ db })
  )

  return router
}