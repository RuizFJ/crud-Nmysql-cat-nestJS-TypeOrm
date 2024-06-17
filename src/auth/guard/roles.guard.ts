import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}
  
  canActivate(
    context: ExecutionContext,): boolean  
    {

      const role = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
        context.getHandler(),
        context.getClass( )
      ])  
      

      if(!role){        //Si no se encuentra un rol requerido en los metadatos, permite el acceso a la ruta devolviendo true.
        return true
      }

      

      const {user} = context.switchToHttp().getRequest()

      if(user.role === Role.ADMIN){

        return true
      }

      return role === user.role
  }
}
