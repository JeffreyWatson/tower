import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TicketService {

  async getMyTickets(accountId) {
    const ticket = await dbContext.Tickets.find({ accountId })
      .populate('event')
    return ticket
  }

  async getTicketHolders(eventId) {
    const attendees = await dbContext.Tickets.find({ eventId })
      .populate('profile', 'name picture')
      .populate('event')
    return attendees
  }

  async getById(id) {
    const ticket = await dbContext.Tickets.findById(id)
    if (!ticket) {
      throw new BadRequest('Invalid Id')
    }
    return ticket
  }


  async create(ticketData) {
    const towerEvent = await dbContext.TowerEvents.findById(ticketData.eventId)
    if (towerEvent.capacity == 0) {
      throw new BadRequest('Capacity is full')
    }
    const ticket = await dbContext.Tickets.create(ticketData)
    // NOTE need to create badrequest for user already having a ticket.
    towerEvent.capacity -= 1
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    towerEvent.save()
    return ticket
  }


  async delete(id, userId) {
    const ticket = await this.getById(id)
    if (ticket.accountId.toString() != userId) {
      throw new Forbidden('This is not your ticket.')
    }
    await ticket.remove()
    const towerEvent = await dbContext.TowerEvents.findById(ticket.eventId)
    towerEvent.capacity++
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    await towerEvent.save()
  }

}

export const ticketService = new TicketService()