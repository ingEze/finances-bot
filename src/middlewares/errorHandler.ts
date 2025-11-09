import { Request, Response, NextFunction } from 'express'
import logger from 'src/utils/logger'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  logger.error(`[${req.method}] ${req.url} - ${err.message}`)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  })
}
