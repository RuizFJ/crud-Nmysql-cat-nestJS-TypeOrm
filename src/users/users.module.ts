import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]   //Para poder usar un servicio en otro modulo, necesito exportarlo desde el modulo principal, debido a que estan encapsulados
})
export class UsersModule {}