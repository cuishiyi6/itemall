import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../service/UserService';
import { User } from '../entity/User';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EncryptPipe } from '../common/pipe/EncryptPipe';
import { AuthGuard } from '../common/guard/AuthGuard';
import { upload } from '../util';

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('send')
  @ApiOperation({
    summary: '短信验证',
    description: JSON.stringify({ phone: 17602900172, code: 123456 }),
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
  async save(
    @UploadedFile() file,
    @Body() user: User,
  ): Promise<string | ForbiddenException> {
    if (!(file && Object.keys(user).length))
      throw new BadRequestException('请求参数出错');
    // 验证当前手机号是否注册
    const isExist = await this.service.findOne({ phone: user.phone });
    if (isExist) throw new BadRequestException('手机号已经注册');
    user.avatar = upload(file);
    return this.service.save(user);
  }

  @Post('login')
  @UsePipes(EncryptPipe)
  @ApiOperation({ summary: '登录' })
  // eslint-disable-next-line @typescript-eslint/ban-types
  async login(@Body() user: User): Promise<Object> {
    return this.service.login(user);
  }

  @Post('modify')
  @UsePipes(EncryptPipe)
  @UseInterceptors(FileInterceptor('avatar'))
  @UseGuards(AuthGuard)
  async modify(@UploadedFile() file, @Body() user: User) {
    if (!(file && Object.keys(user).length))
      throw new BadRequestException('请求参数出错');
    user.avatar = upload(file);
    return this.service.modify(user);
  }
}
