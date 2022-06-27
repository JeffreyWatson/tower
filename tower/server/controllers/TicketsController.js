import { Auth0Provider } from "@bcwdev/auth0provider"
import { ticketService } from "../services/TicketService"
import BaseController from "../utils/BaseController"


export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.delete)
  }
  getAll(arg0, getAll) {
    throw new Error("Method not implemented.")
  }
  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketService.create(req.body)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await ticketService.delete(req.params.id, req.userInfo.id)
      return res.send('You gave your ticket back.')
    } catch (error) {
      next(error)
    }
  }

}