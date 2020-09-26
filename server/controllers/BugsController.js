import BaseController from "../utils/BaseController.js";
import auth0provider from "@bcwdev/auth0provider";
import { bugService } from "../services/BugService.js";



//public
export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(auth0provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
  }

  async getAll(req, res, next) {
    try {
      let data = await bugService.getAll(req.query)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  //REVIEW maybe need to add , req.userInfo.email again
  async getById(req, res, next) {
    try {
      let data = await bugService.getById(req.params.id)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await bugService.create(req.body)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      let data = await bugService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
}