import { IPost } from "../../post.interface";

export type UpdatePostDto = Partial<Pick<IPost,'name'|'description'|'isPublished'>> & 
Pick<IPost,'id'|'authorId'|'isPublished'>;