import { IPost } from "../post.interface";

export class PostUpdatedEvent {
  constructor(public readonly post: IPost) {}
}