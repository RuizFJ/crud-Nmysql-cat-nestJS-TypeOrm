import { SetMetadata } from "@nestjs/common";
import { Role } from "../../common/enums/rol.enum";


export const ROLES_KEY = 'roles'
export const Roles = (role:Role /*Especificamos que sera de el enum que hicimos */) => SetMetadata(ROLES_KEY, role)    //el parametro que le pasamos es el rol que ponemos en el decorador
