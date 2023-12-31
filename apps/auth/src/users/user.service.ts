import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserDto } from './dtos/get-user.dto';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    });
  }

  async getUser(getUserDto: GetUserDto) {
    return this.userRepository.findOne(getUserDto);
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      email
    })
    
    if(!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if(!passwordIsValid){
      throw new UnauthorizedException('Credentials not valid!');
    }

    return user;
  }
}
