import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPostQuery } from "./get-post.query";
import { PostRepository } from "../../repo/post.repository";
import { PostAggregate } from "../../domain/post.aggregate";
;

@QueryHandler(GetPostQuery)
export class GetPostQueryHandler implements IQueryHandler<GetPostQuery,PostAggregate>{
    constructor(
        private readonly postRepository:PostRepository
    ) {}
    
   
    async execute({id}: GetPostQuery): Promise<PostAggregate|null> {
        const existPost = await this.postRepository
            .findOne(+id)
            .catch(err=>err)

        return existPost;
    }
}