import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class CommentService {

  async getComment(id) {
    const res = await api('api/comment/' + id)
    logger.log(res.data)
    AppState.comment = res.data
  }
}

export const commentService = new CommentService()