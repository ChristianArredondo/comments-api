import { ObjectId } from "mongodb"

export interface Comment {
  _id: ObjectId
  body: string
  createdByUsername: string
  createdDate: Date
  isRoot: boolean
  parentComment_id: ObjectId | null
  title: string | null
  totalComments: number
}