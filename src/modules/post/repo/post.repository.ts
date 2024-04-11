import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "../post.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { PostAggregate } from "../domain/post.aggregate";

@Injectable()
export class PostRepository{
    constructor(
        @InjectRepository(PostEntity) private userRepo:Repository<PostEntity>,
    ){}


    async save(user:PostAggregate){
        return await this.userRepo.save(user) 
    }

    async create(user:PostEntity){
        console.log('asasdasd',user);
        
        return await this.userRepo.save(user) 
    }

    async findAll(){
        return await this.userRepo.find();
    }

    async findOne(id:number){
        return await this.userRepo.findOne({where:{id}});
    }

    async findById(id:number){
        return await this.userRepo.findOne({where:{id}});
    }

    async findAll2(){
    }
}