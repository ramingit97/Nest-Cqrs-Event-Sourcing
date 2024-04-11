import { IS_LENGTH, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class PostCreateDto{
    @IsString()
    @IsNotEmpty()
    name:string;
    
    @IsString()
    description:string;    
}