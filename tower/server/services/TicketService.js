import { dbContext } from "../db/DbContext"
import { AccountSchema } from "../models/Account"
import { BadRequest, Forbidden } from "../utils/Errors"
import { towerEventService } from "./TowerEventService"

class TicketService {

  async getMyTickets(accountId) {
    const ticket = await dbContext.Tickets.find({ accountId })
      // NOTE top populate not needed. 
      .populate('account', 'name picture')
      .populate('tevent')
    return ticket
  }

  async getTicketHolders(eventId) {
    const attendees = await dbContext.Tickets.find({ eventId })
      .populate('account', 'name picture')
      .populate('tevent')
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
    await ticket.populate('account', 'name picture')
    await ticket.populate('tevent')
    towerEvent.save()
    return ticket
  }


  async delete(id, userId) {
    const ticket = await this.getById(id)
    if (ticket.accountId.toString() != userId) {
      throw new Forbidden('This isnt your ticket.')
    }
    await ticket.remove()
    const towerEvent = await dbContext.TowerEvents.findById(ticket.eventId)
    towerEvent.capacity++
    await ticket.populate('account', 'name picture')
    await ticket.populate('tevent')
    await towerEvent.save()
  }

}

export const ticketService = new TicketService()