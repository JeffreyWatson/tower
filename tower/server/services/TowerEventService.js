import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class TowerEventService {


  async getAll(query = {}) {
    let towerEvent = await dbContext.TowerEvents.find(query).populate('creator', 'name picture')
    return towerEvent
  }

  async getById(id) {
    let towerEvent = await dbContext.TowerEvents.findById(id).populate('creator', 'name picture')
    return towerEvent
  }

  async create(body) {
    let towerEvent = await dbContext.TowerEvents.create(body)
    const today = new Date()
    if (new Date(towerEvent.startDate) <= today) {
      throw new BadRequest('You cannot schedule events in the past.')
    }
    await towerEvent.populate('creator', 'name picture')
    return towerEvent
  }

  async update(id, update) {
    const original = await dbContext.TowerEvents.findById(id).populate('creator', 'name picture')
    if (original.creatorId.toString() != update.creatorId) {
      throw new BadRequest('This is not yours to update!')
    }
    if (original.isCanceled != false) {
      throw new BadRequest('Cancelled events cannot be edited')
    }
    original.name = update.name ? update.name : original.name
    original.description = update.description ? update.description : original.description
    original.coverImg = update.coverImg ? update.coverImg : original.coverImg
    original.location = update.location ? update.location : original.location
    original.capacity = update.capacity ? update.capacity : original.capacity
    original.startDate = update.startDate ? update.startDate : original.startDate
    original.type = update.type ? update.type : original.type
    original.save()
    return update
  }

  async delete(id, userId) {
    const towerEvent = await dbContext.TowerEvents.findById(id)
    if (towerEvent.creatorId.toString() != userId) {
      throw new BadRequest('You cannot edit this event.')
    }
    towerEvent.isCanceled = true
    await towerEvent.save()
    return 'Your event has been cancelled'
  }


}

export const towerEventService = new TowerEventService()