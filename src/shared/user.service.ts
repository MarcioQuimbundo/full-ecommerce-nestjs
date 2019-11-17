import { HttpStatus } from '@nestjs/common';
import { Injectable, HttpException } from '@nestjs/common';
import { User } from 'src/types/user';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDTO, LoginDTO } from './../auth/auth.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  private sanitizerUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async create(userDTO: RegisterDTO) {
    const { username } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    const createUser = new this.userModel(userDTO);
    await createUser.save();
    return this.sanitizerUser(createUser);
  }

  async findByLogin(userDTO: LoginDTO) {
    //console.log(userDTO);
    const { username, password } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    console.log(user.password);
    if (await bcrypt.compare(password, user.password, null)) {
      return this.sanitizerUser(user);
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
