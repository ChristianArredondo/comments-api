import { Request } from "express"
import { ParamsDictionary } from "express-serve-static-core"

export interface WithParamsAndQuery<Params extends ParamsDictionary, Query = null> extends Request {
  params: Params
  query: Query
}