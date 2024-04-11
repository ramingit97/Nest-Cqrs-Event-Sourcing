import { IPost } from "../../post.interface";

export type CreatePostDto = Pick<IPost,'description'|'name'>;