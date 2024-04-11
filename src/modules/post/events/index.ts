import { Type } from "@nestjs/common";
import {  IEventHandler } from "@nestjs/cqrs";
import { SyncItemHandler } from "./create-post.event-handler";
import { SyncItemHandler2 } from "./update-post.event-handler";

export const POST_EVENTS_HANDLERS: Type<IEventHandler>[] = [
    SyncItemHandler,
    SyncItemHandler2
];