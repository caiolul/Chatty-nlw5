import { Request, Response } from "express";
import { UsersServices } from "../services/UsersServices";

export class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const userServices = new UsersServices();

    const user = await userServices.create(email);

    return response.json(user);
  }
}
