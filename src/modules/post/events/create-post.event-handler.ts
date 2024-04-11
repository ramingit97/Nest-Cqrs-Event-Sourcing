import { CommandBus, EventBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PostCreatedEvent } from "./create-post.event";
import { PostFacade } from "../post.facade";
import { EventStoreService } from "@src/modules/events/event.service";

@EventsHandler(PostCreatedEvent)
export class SyncItemHandler implements IEventHandler<PostCreatedEvent> {
  constructor(
    private readonly postFacade:PostFacade,
    private readonly eventSource:EventStoreService
  ) {}

  async handle({post}: PostCreatedEvent) {
    console.log("Post create event post",post);
    this.eventSource.saveEvent({
      event_data:post,
      event_type:"PostCreatedEvent",
      id:post.id,
      created_at:new Date()
    })
    // await this.postgresService.create(post);
  }
}