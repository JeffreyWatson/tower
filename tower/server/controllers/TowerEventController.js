import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService";
import { ticketService } from "../services/TicketService";
import { towerEventService } from "../services/TowerEventService";
import BaseController from "../utils/BaseController";


export class TowerEventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/tickets', this.getTicketHolders)
      .get('/:id/comments', this.getComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      const towerEvent = await towerEventService.getAll(req.query);
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const towerEvent = await towerEventService.getById(req.params.id)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      const comments = await commentService.getComments(req.params.id)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }


  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventService.create(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventService.update(req.params.id, req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }

  async getTicketHolders(req, res, next) {
    try {
      const ticketHolders = await ticketService.getTicketHolders(req.params.id)
      return res.send(ticketHolders)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const message = await towerEventService.delete(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

}