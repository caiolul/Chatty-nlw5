import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../models/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}
export class SettingsServices {
  private settingsRepository: Repository<Setting>;
  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }
  async create({ chat, username }: ISettingsCreate) {
    const userAlreadyExists = await this.settingsRepository.findOne({
      username,
    });
    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }
    const settings = this.settingsRepository.create({
      chat,
      username,
    });
    await this.settingsRepository.save(settings);

    return settings;
  }

  async findByUsername(username: string) {
    const setting = await this.settingsRepository.findOne({
      username,
    });
    if (setting) {
      return setting;
    } else {
      throw new Error("Settings not found");
    }
  }

  async update(username: string, chat: boolean) {
    const setting = await this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where("username = :username", { username })
      .execute();
    if (setting) {
      return setting;
    } else {
      throw new Error("Error in updade");
    }
  }
}
