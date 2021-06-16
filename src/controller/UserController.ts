import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../service/UserService';
import { User } from '../entity/User';
import { FileInterceptor } from '@nestjs/platform-express';
import { nanoid } from 'nanoid';
import path, { extname, join } from 'path';
import * as fs from 'fs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EncryptPipe } from '../common/pipe/EncryptPipe';
import { AuthGuard } from '../common/guard/AuthGuard';
import { createWriteStream } from 'fs';
import { upload } from "../util/upload";
@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('send')
  @ApiOperation({
    summary: '短信验证',
    description: JSON.stringify({ phone: 15535917570, code: 123456 }),
  })
  async sendCode(@Body() body): Promise<string> {
    return this.service.sendCode(body);
  }

  @Post('save')
  @ApiOperation({
    summary: '注册用户',
    description: JSON.stringify({
      phone: 15535917570,
      password: 123456,
      nickName: 'admin',
      gander: '2',
      email: '1960393658@qq.com',
    }),
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @UsePipes(EncryptPipe)
  async save(@UploadedFile() file, @Body() user: User): Promise<string> {
    if (!(file && Object.keys(user).length))
      throw new BadRequestException('请求参数错误');
    const isExist = await this.service.findOne({phone:user.phone});
    if (isExist)throw  new  BadRequestException('手机号已注册');
    user.avatar = upload(file)
    return this.service.save(user);
    //文件保存路径
  }

  @Post('login')
  @UsePipes(EncryptPipe)
  @ApiOperation({ summary: '登录' })
  async login(@Body() user: User): Promise<{}> {
    return this.service.login(user);
  }


  @Post('modify')
  @UsePipes(EncryptPipe)
  @UseInterceptors(FileInterceptor('avatar'))
  @UseGuards(AuthGuard)
  async modify(@UploadedFile() file,@Body() user:User){
    if (!(file && Object.keys(user).length))throw new BadRequestException('请求参数错误')
  user.avatar = upload(file);
    return this.service.modify(user);
  }
}
