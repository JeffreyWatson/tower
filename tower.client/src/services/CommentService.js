import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentService {

  async getComment(id) {
    const res = await api.get(`api/events/${id}/comments`)
    AppState.comment = res.data
    logger.log("comments", res.data)
  }

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    AppState.comment.unshift(res.data)
    return res.data
  }
}

export const commentService = new CommentService()