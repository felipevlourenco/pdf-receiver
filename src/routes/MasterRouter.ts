import { Router } from 'express'
import ThemeARouter from './themeA/ThemeARouter'
import themeBRouter from './themeB/themeBRouter'
import PdfRouter from './pdf/PdfRouter'

class MasterRouter {
  private _router = Router()
  private _subRouterA = ThemeARouter
  private _subRouterB = themeBRouter
  private _subRouterPdf = PdfRouter

  constructor() {
    this._configure()
  }

  private _configure() {
    this._router.use('/themeA', this._subRouterA)
    this._router.use('/themeB', this._subRouterB)
    this._router.use('/pdf', this._subRouterPdf)
  }

  get router() {
    return this._router
  }
}

export = new MasterRouter().router
