import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './create-cat.dto';
import {IsString, MinLength, IsOptional, IsInt, IsPositive} from 'class-validator'

export class UpdateCatDto {

        @IsString()
        @MinLength(3)
        @IsOptional()
        name?: string
        
        @IsInt()
        @IsPositive()
        @IsOptional()
        age?: number
    
        @IsString() //Todo esto se hace por medio del dto
        @IsOptional()
        breed?: string
}
