import { EntityRepository, Repository } from "typeorm";
import { Setting } from "../models/Setting";

@EntityRepository(Setting)
export class SettingsRepository extends Repository<Setting> {}
