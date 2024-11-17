import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/database/schema/user';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async findAll() {
    const users = this.userModel.find().exec()
    return users;
  }

  async findOne(id: string) {
    const user =  this.userModel.findById(id).exec();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateData = { ...updateUserDto, updateAt: Date.now()};
    const user = this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    return user;
  }

  async remove(id: string) {
    const deletedUser = this.userModel.findByIdAndDelete(id).exec();
    return deletedUser;
  }

  async findByEmail(email: string) {
    const user = this.userModel.findOne({email: email}).exec();
    return user;
  }
}
