import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TowerEventService {
  async getEvents() {
    const res = await api.get('api/events')
    AppState.towerEvent = res.data
  }

  async getEvent(id) {
    const res = await api.get('api/events/' + id)
    AppState.activeEvent = res.data
  }

  async createEvent(towerEventData) {
    const res = await api.post('api/events', towerEventData)
    AppState.towerEvent.unshift(res.data)
    return res.data
  }

  async deleteEvent(id) {
    const res = await api.delete(`api/events/${id}`)
    AppState.towerEvent = AppState.towerEvent.filter(t => t.id != id)
  }

}

export const towerEventService = new TowerEventService()