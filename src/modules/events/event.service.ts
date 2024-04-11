// event-store.service.ts
import { Injectable } from '@nestjs/common';
import { EventsEntity } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from "typeorm";
@Injectable()
export class EventStoreService {
  constructor(
    @InjectRepository(EventsEntity) private restRepo:Repository<EventsEntity>,
  ) {}

  async saveEvent(event: EventsEntity): Promise<EventsEntity> {
    return await this.restRepo.save(event)
  }

  async getAllEvents() :Promise<EventsEntity[]> {
    return await this.restRepo.find({});
  }
}
