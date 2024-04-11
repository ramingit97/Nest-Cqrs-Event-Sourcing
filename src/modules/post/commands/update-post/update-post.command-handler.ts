import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePostCommand } from "./update-post.command";
import { BadRequestException } from "@nestjs/common";
import { PostRepository } from "../../repo/post.repository";
import { PostAggregate } from "../../domain/post.aggregate";
import { PostService } from "../../post.service";
import { PostUpdatedEvent } from "../../events/update-post.event";

@CommandHandler(UpdatePostCommand)
export class UpdatePostCommandHandler implements ICommandHandler<UpdatePostCommand,PostAggregate>{
    
    constructor(
        private readonly postRepository:PostRepository,
        private readonly eventPublisher:EventPublisher,
        private readonly postService:PostService
    ){

    }
    
    async execute({post}: UpdatePostCommand): Promise<PostAggregate> {
        const existPost = await this.postRepository
            .findOne(post.id)
            .catch(err=>err)
        if(!existPost){
            throw new BadRequestException(`Post by id ${post.id} not found`);
        }    

        const createdPost = await this.postService.update(existPost);
        const event = this.eventPublisher.mergeObjectContext(createdPost);
        event.publish(new PostUpdatedEvent(createdPost))        
        event.commit();
        return createdPost;
    }
    
}
