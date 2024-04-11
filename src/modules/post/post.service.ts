import { BadRequestException, Injectable } from '@nestjs/common';
import { PostCreateDto} from './dto/post-create.dto';
import { PostRepository } from './repo/post.repository';
import { PostCreatedEvent } from './events/create-post.event';
import { PostAggregate } from './domain/post.aggregate';
import { UpdatePostDto } from './commands/dto/update-post.dto';

@Injectable()
export class PostService {

    constructor(
            private readonly postRepository:PostRepository,
    ){}

    async create(post:PostCreateDto):Promise<PostAggregate>{
        const result = {
            ...post,
            authorId:"Ramin"
        }
        const postAggregate = PostAggregate.create(result);
        let createdPost = await this.postRepository.
            save(postAggregate).
            catch(err=>{
                throw new BadRequestException(err)
            })
        // const event = new PostCreatedEvent(createdPost);
        return createdPost;    
    }

    async update(post:UpdatePostDto){
        post.isPublished = true;

        console.log(post,"post");
        

    // Создаем агрегат поста
        const postAggregate = PostAggregate.create(post);

        try {
            // Сохраняем обновленный пост в репозитории
            const updatedPost = await this.postRepository.save(postAggregate);

            // Возвращаем обновленный пост
            return updatedPost;
        } catch (err) {
            // Обрабатываем возможные ошибки
            throw new BadRequestException(err.message);
        }  
    }

    async getById(id:string){
        // return await this.postFacade.queries.getPost(id);
        return null;
    }


    async getAll(){
        return await this.postRepository.findAll();
    }

}
