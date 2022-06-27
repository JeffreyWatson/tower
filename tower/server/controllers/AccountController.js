import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { ticketService } from '../services/TicketService'
import { towerEventService } from '../services/TowerEventService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/events', this.getEvents)
      .get('/tickets', this.getMyTickets)
  }
  async getMyTickets(req, res, next) {
    try {
      const userInfo = req.userInfo
      const tickets = await ticketService.getMyTickets(userInfo.id)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async getEvents(req, res, next) {
    try {
      const towerEvent = await towerEventService.getAll({ creatorId: req.userInfo.id })
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
