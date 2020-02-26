import { Db } from 'mongodb'
import { Request, Response, NextFunction } from 'express'

interface EnsureDataCheck {
  collectionName: string,
  buildQueryFromReq: (req: Request) => Object | null,
}

/**
 * Runs queries and stops request with
 * `404` if data is not found for all.
 * 
 * Considerations:
 *  - have option to use redis/cache
 *  - have option to set data in request (i.e. req.data)
 */
export const ensureDataExistsMiddleware = (
  db: Db,
  checks: EnsureDataCheck[]
) => async (req: Request, res: Response, next: NextFunction) => {
  if (!checks || !checks.length) next()

  const dataPromises = await Promise.all(
    checks.reduce((memo, check) => {
      const query = check.buildQueryFromReq(req)
      if (query) memo.push(db.collection(check.collectionName).findOne(query))
      return memo
    }, [] as Promise<any>[])
  )

  const allDataExists = dataPromises.every(data => !!data)
  if (allDataExists) next()
  else res.status(404).send()
}