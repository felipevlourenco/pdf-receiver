import { Router, Request, Response, NextFunction } from 'express'
import { createWriteStream } from 'fs'
import PdfController from '../../controllers/PdfController'
import logger from '../../logger/logger'

class PdfRouter {
  private _router = Router()
  private _controller = PdfController

  constructor() {
    this._configure()
  }

  private _configure() {
    this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.defaultMethod())
    })
    this._router.post('/', (req: Request, res: Response, next: NextFunction) => {
      const { type } = req.query

      logger.info('Post in /api/pdf')
      req.on('data', chunk => {
        logger.info(`Chunk received...`)
        const writeStream = createWriteStream(`./${type}.pdf`)
        writeStream.write(chunk)
      })
      req.on('end', () => {
        logger.info(`Closing connection`)
        res.status(201).json({ text: 'ok' })
      })
    })
  }

  get router() {
    return this._router
  }
}

export = new PdfRouter().router
