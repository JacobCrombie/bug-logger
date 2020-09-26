import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class BugService {
  async getAll(query = {}) {
    return await dbContext.Bugs.find(query)
  }
  //REVIEW maybe need to add back in , email to arguement
  async getById(id) {
    let data = await dbContext.Bugs.findById(id)
    if (!data) {
      throw new BadRequest("Invalid Id")
    }
  }
  async create(rawData) {
    let data = await dbContext.Bugs.create(rawData)
    return data
  }
  async edit(id, userEmail, update) {
    let data = await dbContext.Bugs.findOneAndUpdate({ id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid Id or you do not own this Bug Log Input")
    }
  }

}

export const bugService = new BugService()