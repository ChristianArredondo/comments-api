import Ajv from 'ajv'
import { Request, Response, NextFunction } from 'express'

export const requestValidatorMiddleware = (schema: any) => {
  const validateFn = new Ajv().compile(schema)
  return (req: Request, res: Response, next: NextFunction) => {
    if (validateFn(req.body)) next()
    else {
      console.error(validateFn.errors)
      res.status(400).send()
    }
  }
}