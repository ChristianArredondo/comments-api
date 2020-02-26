import { ObjectId } from "mongodb"

export interface Comment {
  _id: ObjectId
  body: string
  createdByUsername: string
  createdDate: Date
  isRoot: boolean
  parentCommentId: string | null
  title: string
  totalComments: number
}