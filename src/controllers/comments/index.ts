import { Db } from "mongodb"
import express from 'express'
import { handleFetchComments } from "./handlers/fetch-comments.handler"

export const initCommentRoutes = (db: Db) => {
  const router = express.Router()
  router.get('/', handleFetchComments({ db }))

  return router
}