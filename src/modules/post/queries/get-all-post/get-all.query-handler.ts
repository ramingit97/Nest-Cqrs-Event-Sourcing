import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllPostQuery } from "./get-all.query";
import { PostAggregate } from "../../domain/post.aggregate";
import { PostRepository } from "../../repo/post.repository";
import { PostCreatedEvent } from "../../events/create-post.event";
import { EventStoreService } from "@src/modules/events/event.service";

@QueryHandler(GetAllPostQuery)
export class GetAllPostQueryHandler implements IQueryHandler<GetAllPostQuery,PostAggregate>{
    constructor(
        private readonly postRepository:PostRepository,
        private readonly eventSource:EventStoreService

    ) {}
    
   
    async execute(): Promise<PostAggregate|null> {

        const getPost = PostAggregate.create({
           
        })

        console.log("start",getPost);
        

        let events = await this.eventSource.getAllEvents();
        await getPost.loadFromHistory(events)
        console.log("end",getPost);
        
        
        const existPost = await this.postRepository
            .findAll()
            .catch(err=>err)

        return existPost;
    }
}