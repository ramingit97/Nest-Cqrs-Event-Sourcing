import { Inject, Module, OnModuleInit, Query } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { POST_COMMAND_HANDLERS } from './commands';
import { POST_EVENTS_HANDLERS } from './events';
import { POST_QUERIES_HANDLERS } from './queries';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { PostFacade } from './post.facade';
import { postFacadeFactory } from './post.facade-factory';
import { PostRepostitory } from './domain/post.repo.abstract';
import { PostAdapter } from './providers/post.adapter';
import { PostRepository } from './repo/post.repository';
import { EventStoreService } from '../events/event.service';
import { EventsEntity } from '../events/event.entity';
@Module({
    imports:[
        CqrsModule,
        TypeOrmModule.forFeature([PostEntity,EventsEntity]),
    ],
    providers: [
        PostService,
        EventStoreService,
        ...POST_COMMAND_HANDLERS,
        ...POST_EVENTS_HANDLERS,
        ...POST_QUERIES_HANDLERS,
        {
            provide:PostFacade,
            inject:[CommandBus,QueryBus,EventBus],
            useFactory:postFacadeFactory
        },
        {
            provide:PostRepostitory,
            useClass:PostAdapter
        },
        PostRepository,
    ],
    controllers:[PostController],
    exports:[]
})

export class PostModule {}
