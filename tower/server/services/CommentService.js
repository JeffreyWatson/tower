import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class CommentService {

  async create(body) {
    let comment = await dbContext.Comments.create(body)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async getComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId })
      .populate('creator', 'name picture')
      .populate('event')
    return comments
  }

  async delete(id, userId) {
    const comment = await dbContext.Comments.findById(id)
    if (comment.creatorId.toString() != userId) {
      throw new BadRequest('This isnt your comment.')
    }
    comment.remove()
    return "deleted your comment."
  }
}

export const commentService = new CommentService()