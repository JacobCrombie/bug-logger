import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class NoteService {
  async getNotesByBugId(query = {}) {
    return await dbContext.Notes.find(query)
  }
  async create(rawData) {
    let data = await dbContext.Notes.create(rawData)
    return data
  }
  async edit(id, userEmail, body) {
    let update = await dbContext.Notes.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, body, { new: true })
    if (!update) {
      throw new BadRequest("Invalid Id or you do not own this Note")
    }
    return update
  }
  async delete(id, userEmail) {
    let data = await dbContext.Notes.findOneAndRemove({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid Id or you do not own this Note")
    }
  }

}

export const noteService = new NoteService()