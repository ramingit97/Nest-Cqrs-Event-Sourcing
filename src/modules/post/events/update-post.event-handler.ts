import { CommandBus, EventBus, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PostCreatedEvent } from "./create-post.event";
import { PostFacade } from "../post.facade";
import { EventStoreService } from "@src/modules/events/event.service";
import { UpdatePostCommand } from "../commands/update-post/update-post.command";
import { PostUpdatedEvent } from "./update-post.event";

@EventsHandler(PostUpdatedEvent)
export class SyncItemHandler2 implements IEventHandler<PostUpdatedEvent> {
  constructor(
    private readonly postFacade:PostFacade,
    private readonly eventSource:EventStoreService
  ) {}

  async handle({post}: UpdatePostCommand) {
    console.log("Post update event post",post);
    this.eventSource.saveEvent({
      event_data:post,
      event_type:"PostUpdatedEvent",
      id:post.id,
      created_at:new Date()
    })
    // await this.postgresService.create(post);
  }
}