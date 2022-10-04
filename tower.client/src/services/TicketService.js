import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TicketService {
  async getAttendees(id) {
    const res = await api.get(`api/events/${id}/tickets`)
    logger.log(res.data)
    AppState.ticket = res.data

  }
}

export const ticketService = new TicketService()