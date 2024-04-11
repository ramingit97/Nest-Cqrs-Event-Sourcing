import { AggregateRoot } from "@nestjs/cqrs";
import { IPost } from "../post.interface";
import { PostUpdatedEvent } from "../events/update-post.event";
import { PostCreatedEvent } from "../events/create-post.event";
import { EventsEntity } from "@src/modules/events/event.entity";

export class PostAggregate extends AggregateRoot implements IPost{
    id:number;
    name: string;
    description: string;
    isPublished=false;
    


    private constructor(){
        super();
    }

    static create(post:Partial<IPost>){
        const _post = new PostAggregate();
        Object.assign(_post,post);
        return _post;
    }

    loadFromHistory(events: any[]): void {
        // console.log("events",events);
        
        events.forEach(event => {
          // Применяем каждое событие из истории к текущему состоянию агрегата
          this.apply(event);
        });
    }

      applyPostUpdatedEvent(event: EventsEntity): void {
        // const { post } = event;
        Object.assign(this,event.event_data)
        
        // // Обновляем соответствующие поля поста
        // this.post.name = post.name;
        // this.post.description = post.description;
        // this.post.authorId = post.authorId;
        // this.post.isPublished = post.isPublished;
      }
      

      applyPostCreatedEvent(event: EventsEntity): void {
        Object.assign(this,event.event_data);
        // const { post } = event;
        // this.post = post;
      }
    
      apply(event: EventsEntity) {
        
        // Определяем тип события и применяем соответствующий метод для обработки
        switch (event.event_type) {
          case "PostCreatedEvent":
            this.applyPostCreatedEvent(event);
            break;
          case "PostUpdatedEvent":
            this.applyPostUpdatedEvent(event);
            break;
          // Добавьте обработку других событий по мере необходимости
        }
      }
}