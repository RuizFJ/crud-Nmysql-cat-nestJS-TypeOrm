import {  IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator"

export class CreateCatDto { //Estructura de datos que se transfieren desde el cliente al controlador para respectivamente pasarla a la db, es como una validacion
    @IsString()
    @MinLength(3)
    name: string
    
    @IsInt()
    @IsPositive()
    age: number

    @IsString() //Todo esto se hace por medio del dto
    @IsOptional()
    breed?: string
}
