import { getCustomRepository, Repository } from "typeorm";
import { Message } from "../models/Message";
import { MessagesRepository } from "../repositories/MessagesRepository";

interface IMessageCreate {
  admin_id?: string;
  user_id: string;
  text: string;
}

export class MessagesServices {
  private messagesRepository: Repository<Message>;
  constructor() {
    this.messagesRepository = getCustomRepository(MessagesRepository);
  }
  async create({ admin_id, user_id, text }: IMessageCreate) {
    const messages = this.messagesRepository.create({
      admin_id,
      user_id,
      text,
    });
    await this.messagesRepository.save(messages);
    return messages;
  }
  async listByUser(user_id: string) {
    const list = this.messagesRepository.find({
      where: { user_id },
      relations: ["user"],
    });
    return list;
  }
}
