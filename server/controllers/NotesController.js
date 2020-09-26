import BaseController from "../utils/BaseController.js"
import auth0provider from "@bcwdev/auth0provider"
import { noteService } from "../services/NoteService.js"


export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await noteService.create(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      let data = await noteService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      await noteService.delete(req.params.id, req.userInfo.email)
      return res.send("Note Deleted Successfully")
    } catch (error) {
      next(error)
    }
  }
}