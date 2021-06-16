import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { sendCode } from '../util';
import { JwtService } from "@nestjs/jwt";

//用户服务层
@Injectable()
export class UserService {
  //注入存储库
  constructor(
    private readonly jwt:JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
  }

  发送验证码;

  async sendCode(body): Promise<string> {
    const isExist = await this.findOne({ phone: body.phone })
    if (isExist) return '手机号已注册'
    return sendCode(body.phone, body.code);
  }


  async save(user: User): Promise<string> {
    await this.userRepository.save(user)
    if (user.id != undefined) {
      return '添加成功';
    }else {
      throw new  ForbiddenException('添加失败');
    }
  }

  /**
   * 根据条件查询一个
   * 登录/查询是否存在
   */
  async findOne(user:User | {}):Promise<User>{
return await this.userRepository.findOne(user);
  }

  /**
   * 登录
   */
async login(user:User):Promise<{}>{
  const loginUser = await this.userRepository.findOne({phone:user.phone},{
    select:
      ["id","nickName","email","gander","phone","avatar","password"]
  })
    if (!loginUser)throw new  BadRequestException("手机号不存在");
    if (loginUser.password !== user.password)throw new BadRequestException("密码错误")
//登录成功开始颁发token
const token = this.jwt.sign({id:loginUser.id,phone:loginUser.phone});
    //删除密码
    delete loginUser.password;
    return {user:loginUser,token};
}
//修改
  async modify(user:User):Promise<string>{
    console.log(user);
    const id = parseInt(String(user.id))
    let update_user = user
    delete update_user.id
    try {
      const res = await  this.userRepository.query("update user set? where id = ?",[user,id])
    }catch (err){
      console.log(err);
    }
    return
  }


}




