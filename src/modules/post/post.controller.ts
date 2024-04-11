import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientKafka, ClientProxy, Ctx, EventPattern, KafkaContext, MessagePattern, Payload, RmqContext, RpcException, TcpContext } from '@nestjs/microservices';
import { PostService } from './post.service';
import { PostCreateDto } from './dto/post-create.dto';
import { PostFacade } from './post.facade';
import { firstValueFrom } from 'rxjs';
import { EventStoreService } from '../events/event.service';
import { UpdatePostDto } from './commands/dto/update-post.dto';

@Controller('post')
export class PostController {
    
    constructor(
        private postService:PostService,
        private readonly postFacade:PostFacade,
        private readonly eventSource:EventStoreService
    ){}

    @Post("create")
    async createPost(@Body() data:PostCreateDto){
        console.log('1212121212');
        
        let result = await this.postFacade.commands.createPost(data);
        return result;
        // let result = await this.postService.create(data);
        // console.log('resutk',result);
        // return result;
    }

    @Post("update")
    async updatePost(@Body() data:UpdatePostDto){
        console.log(data,"data");
        
        let result = await this.postFacade.commands.updatePost(data);
        return result;
        // let result = await this.postService.create(data);
        // console.log('resutk',result);
        // return result;
    }


    
    @Get("all")
    async findAll(){
        let res = this.eventSource.getAllEvents()
        console.log('res',res);
        return res
        // console.log("agent",agent2)
        
    }

    @Get("all2")
    async findAll2(){
        let result = await this.postFacade.queries.getAllPost();
        return result;
    }


    // @EventPattern("notifications")
    // async handleNotifications(@Payload() data:any,@Ctx() context:RmqContext){
    //     console.log(data,"data");
        
    // }


    // @Get(':id')
    // async getPostById(@Param("id") id:string){
    //     return this.postService.getById(id);
    // }


    // @EventPattern("posts222")
    // async createPost2(@Payload() data:any,@Ctx() context:KafkaContext){
    //     // let eventType = context.getMessage().headers['eventType'] as string;
    //     // this.eventEmitter.emit(eventType, data);
    //     console.log(data,"data222");
        
    //     console.log(`Partition 11122- ${context.getPartition()} - ${context.getConsumer()}`);
    //     // this.authService.send("get.user.info",{

    //     // })

    //     // this.authService.emit("get.user.info",{
    //     //     key:'create',
    //     //     topic:'get.user.info',
    //     //     headers:{eventType:"orders.create"},
    //     //     value:1
    //     // }).subscribe(result=>{
    //     //     console.log("222222222222222222222",result)
    //     // })
        

    //     // console.log('res',result);

    //     // this.getHome()
    //     // this.kafkaService.produce({
    //     //     topic:'orders',
    //     //     messages:[{
    //     //       value:'Hello world'
    //     //     }]
    //     // })
    // }

    // @MessagePattern("create_post1")
    // async create_post(){
    //     // console.log("agent",agent2)
    //     return {"ramin":"tupoy"};
    // }

}
