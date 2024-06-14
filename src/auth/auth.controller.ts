import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'supertest';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/rol.enum';
import { Auth } from './decorators/auth.decorator';

interface RequestWithUser extends Request {

    user: {email: string, id: number, role: string}
}

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('/register')
    register(@Body() registerDTO: RegisterDTO){

        
        return this.authService.register(registerDTO)
    }

    @Post('login')
    login(@Body() loginDTO: LoginDTO){  
        
        return this.authService.login(loginDTO)
    }

    /*@Get('profile')
    @Roles(Role.USER) //Estoy importando un enum donde tengo los roles que necesito especificar en cada ruta
    @UseGuards(AuthGuard, RolesGuard)   //Decorador para aplicar guards y que estos restrinjan el acceso de usuarios
    profile(@Req() req: RequestWithUser ){  //El @Req es para acceder al request del auth.guard donde creamos el objeto user
       
        

        return this.authService.profile(req.user)     //Para acceder a infromacion del usuario a traves del token
    }*/

    @Get('profile')
    @Auth(Role.USER)    //Usando decorador que contiene a otros dos decoradores
    profile(@Req() req: RequestWithUser ){  
       
        

        return this.authService.profile(req.user)     //Para acceder a infromacion del usuario a traves del token
    }



}
