import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../models/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
  user_id: string;
  socket_id: string;
  admin_id?: string;
  id?: string;
}
export class ConnectionsServices {
  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }
  async create({ user_id, socket_id, admin_id, id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      user_id,
      socket_id,
      admin_id,
      id,
    });
    await this.connectionsRepository.save(connection);

    return connection;
  }
  async findByUserId(user_id: string) {
    const connection = this.connectionsRepository.findOne({
      user_id,
    });
    return connection;
  }

  async findByWithoutAdmin() {
    const connection = this.connectionsRepository.find({
      where: { admin_id: null },
      relations: ["user"],
    });
    return connection;
  }
  async findBySocketId(socket_id: string) {
    const connection = this.connectionsRepository.findOne({
      socket_id,
    });
    return connection;
  }
  async updateAdminId(user_id: string, admin_id: string) {
    const connection = await this.connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where("user_id = :user_id", { user_id })
      .execute();
    if (connection) {
      return connection;
    } else {
      throw new Error("Error in updade");
    }
  }
}
