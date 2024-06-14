import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs'
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService){}   //Importar el servicio es diferente a importar el repositorio, el repositorio es mas crtico porque tenemos acceso a la base de datos
    
    async register({ name, email, password}: RegisterDTO){

        const user = await this.userService.findOneByEmail(email)

        if(user){
            throw new BadRequestException('Email already registered  ')
        }
         await this.userService.create({
            name,
            email,
            password: await bcryptjs.hash(password,10)
        })

        return {
            name,
            email
        }
    }

    async login({ email, password}: LoginDTO){      //Tenemos que hacer otro DTO esta vez para el login

        const user = await this.userService.findOneByEmail(email)

        if(!user){
            throw new UnauthorizedException('Email is wrong')
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)

        if(!isPasswordValid){
            throw new UnauthorizedException('Password is wrong')
        }
        const payload = {email: user.email, user_id: user.id, role: user.role }

        const token = await this.jwtService.signAsync(payload)
        return {
            token, email,
        }

       
    }

    async profile({email, id, role}: {email:string,id:number, role: string}){

        //if(role !== "admin"){
        //    throw new UnauthorizedException("You are not authorized to access this resource") Forma ineficiente de autorizacion
        //}
        return await this.userService.findOneByEmail(email)
    }
}
