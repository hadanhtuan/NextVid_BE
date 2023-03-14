import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../../auth/dto/auth-credentials';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt'
import { CreateAccountDto } from '../../auth/dto/create-account.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }



  // async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
  //   const {username, password}  = authCredentialsDto;
  //   const user = await this.findOneBy({username})
    
  //   if(user && await user.validatePassword(password)) return user
    
  // }


}



