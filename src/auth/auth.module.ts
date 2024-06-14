import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.constants';

@Module({
  imports: [UsersModule,
     
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,  //Nesecito hacer un archivo para guardar esta clave y despues importarla
      signOptions: { expiresIn: "1d" },
    }),
  ], //Nesecito importar el user module ya que este esta exportando el userService que necesito 
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
