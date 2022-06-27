import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TowerEventService {
  async getEvents() {
    const res = await api.get('api/events')
    logger.log(res.data)
    AppState.towerEvent = res.data
  }

  async getEvent(id) {
    const res = await api.get('api/events/' + id)
    logger.log('-getEvent-', res.data)
    AppState.activeEvent = res.data
  }

  async createEvent(towerEventData) {
    const res = await api.post('api/events', towerEventData)
    logger.log('-createEvent-', res.data)
    AppState.towerEvent.unshift(res.data)
    return res.data
  }

  async deleteEvent(id) {
    const res = await api.delete('api/events/' + id)
    logger.log('-deleteEvent-', res.data)
    AppState.towerEvent = AppState.towerEvent.filter(t => t.id != id)
  }

}

export const towerEventService = new TowerEventService()