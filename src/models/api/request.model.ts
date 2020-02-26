import { Request } from "express"
import { ParamsDictionary } from "express-serve-static-core"

export interface WithParamsAndQuery<Params extends ParamsDictionary, Query = null> extends Request {
  params: Params
  query: Query
}

export interface WithParamsAndBody<Params extends ParamsDictionary, Body = null> extends Request {
  params: Params
  body: Body
}