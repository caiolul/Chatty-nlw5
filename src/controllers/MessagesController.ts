import { Request, Response } from "express";
import { MessagesServices } from "../services/MessagesServices";

export class MessagesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { admin_id, text, user_id } = request.body;
    const messagesServices = new MessagesServices();

    const message = await messagesServices.create({
      admin_id,
      user_id,
      text,
    });
    return response.json(message);
  }
  async showByUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const messagesServices = new MessagesServices();

    const list = await messagesServices.listByUser(id);
    return response.json(list);
  }
}
