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
      logger.info('Starting pdf generate')
      const { class: name, uniqueid, type } = req.query
      const writeStream = createWriteStream(`./${name}_${type}_${uniqueid}.pdf`)

      req.on('data', chunk => {
        logger.info(`Chunk received...`)
        writeStream.write(chunk)
      })
      req.on('end', () => {
        logger.info(`Closing connection`)
        res.status(200).json({ text: 'ok' })
      })
    })
  }

  get router() {
    return this._router
  }
}

export = new PdfRouter().router
