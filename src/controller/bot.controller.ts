import { Request, Response, NextFunction } from 'express'
import { botService }  from 'src/service/bot.service.js'

export const botController = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { msg } = req.body
    if (!msg) {
      throw new Error('El mensaje no puede estar vacío')
    }
    const response = await botService(String(msg))
    res.status(200).json({
      success: true,
      data: response
    })
  } catch (err) {
    next(err)
  }
}
