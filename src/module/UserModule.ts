import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { UserService } from '../service/UserService';
import { UserController } from '../controller/UserController';
import { JwtModule } from '@nestjs/jwt';
import { JWTConstant } from '../constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWTConstant.secret,
      signOptions: { expiresIn: JWTConstant.expiresIn },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
