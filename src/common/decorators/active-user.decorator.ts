import { ExecutionContext, createParamDecorator } from "@nestjs/common";

//Decorador para acceder a la informacion del usuario, ya que con el @Req no es muy conveniente
export const ActiveUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
      }
)