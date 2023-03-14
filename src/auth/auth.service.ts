import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { User } from '../common/entities/user.entity';
import { UserRepository } from '../common/repositories/user.repository';
import { CreateAccountDto } from './dto/create-account.dto';
import * as bcrypt from 'bcrypt'
import * as firebase from 'firebase-admin';
import { ConflictException } from '@nestjs/common/exceptions';
import { ProviderType } from 'src/common/enum';
const crypto = require('crypto');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        credential: firebase.credential.cert({
          privateKey: process.env.FIREBASE_PRIVATE_KEY,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          projectId: process.env.FIREBASE_PROJECT_ID,
        }),
      });
    }
  }

  async signUp(createAccountDto: CreateAccountDto): Promise<void> {
    const {username, password, full_name, email, avatar} = createAccountDto;

    const user = new User() 
    user.username = username;
    user.full_name = full_name;
    user.email = email;
    user.avatar = avatar;
    user.salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(password, user.salt)

    try {
      await user.save()
      
    } catch (error) { 
      throw new ConflictException('Username already exits')
    }
  }


  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const { id, username, avatar, follows, blogs } =
      await this.validateUserPassword(authCredentialsDto);

    console.log(follows);
    if (!id) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id, username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken, id, username, avatar, follows, blogs };
  }

  async getUser(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await user.validatePassword(password))) return user;
    else return new User();
  }

  async facebookAuth(accessToken: string) {
    try {
      const verify = await firebase.auth().verifyIdToken(accessToken, true);

      const userGoogle = await firebase.auth().getUser(verify.uid);

      const isUserExit = await this.userRepository.findOneBy({provider_type: ProviderType.FACEBOOK, provider_id: userGoogle.uid})
      if(isUserExit) {
        const {id, username, avatar, follows, blogs} = isUserExit
        const payload = { id, username };
        const appAccessToken = this.jwtService.sign(payload);
        return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
      } else {  
        const user = new User()
        user.avatar = userGoogle.photoURL;
        user.full_name = userGoogle.displayName
        user.email = userGoogle.email
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash('', user.salt)
        
        let uuid = ''
        while(true)
        {
          uuid = crypto.randomBytes(6).toString('hex');
          let isUsernameExit = await this.userRepository.findOneBy({username: 'user'+uuid})
          
          if(!isUsernameExit)
          break;
        }
        user.username = 'user'+uuid;
        user.provider_type = ProviderType.FACEBOOK
        user.provider_id = userGoogle.uid
        await user.save()
        
        // return a token that the React frontend can use to authenticate future requests
        const {id, username, avatar, follows, blogs} = user
        const payload = { id, username };
        const appAccessToken = this.jwtService.sign(payload);
        return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async googleAuth(accessToken: string) {
    try {
      const verify = await firebase.auth().verifyIdToken(accessToken, true);

      const userGoogle = await firebase.auth().getUser(verify.uid);

      const isUserExit = await this.userRepository.findOneBy({provider_type: ProviderType.GOOGLE, provider_id: userGoogle.uid})
      if(isUserExit) {
        const {id, username, avatar, follows, blogs} = isUserExit
        const payload = { id, username };
        const appAccessToken = this.jwtService.sign(payload);
        return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
      } else {  
        const user = new User()
        user.avatar = userGoogle.photoURL;
        user.full_name = userGoogle.displayName
        user.email = userGoogle.email
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash('', user.salt)
        
        let uuid = ''
        while(true)
        {
          uuid = crypto.randomBytes(6).toString('hex');
          let isUsernameExit = await this.userRepository.findOneBy({username: 'user'+uuid})
          
          if(!isUsernameExit)
          break;
        }
        user.username = 'user'+uuid;
        user.provider_type = ProviderType.GOOGLE
        user.provider_id = userGoogle.uid
        await user.save()
        
        // return a token that the React frontend can use to authenticate future requests
        const {id, username, avatar, follows, blogs} = user
        const payload = { id, username };
        const appAccessToken = this.jwtService.sign(payload);
        return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async githubAuth(accessToken: string) {
    try {
      const verify = await firebase.auth().verifyIdToken(accessToken, true);

      const userGithub = await firebase.auth().getUser(verify.uid);

      const isUserExit = await this.userRepository.findOneBy({provider_type: ProviderType.GITHUB, provider_id: userGithub.uid})
      if(isUserExit) {
        const {id, username, avatar, follows, blogs} = isUserExit
        const payload = { id, username };
        const appAccessToken = this.jwtService.sign(payload);
        return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
      } else {  
        const user = new User()
        user.avatar = userGithub.photoURL;
        user.full_name = userGithub.displayName
        user.email = userGithub.email
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash('', user.salt)
        
        let uuid = ''
        while(true)
        {
          uuid = crypto.randomBytes(6).toString('hex');
          let isUsernameExit = await this.userRepository.findOneBy({username: 'user'+uuid})
          
          if(!isUsernameExit)
          break;
        }
        user.username = 'user'+uuid;
        user.provider_type = ProviderType.GITHUB
        user.provider_id = userGithub.uid
        await user.save()
        
        // return a token that the React frontend can use to authenticate future requests
        const {id, username, avatar, follows, blogs} = user
        const payload = { id, username };
        const appAccessToken = this.jwtService.sign(payload);
        return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async twitterAuth(accessToken: string) {
    try {
      const verify = await firebase.auth().verifyIdToken(accessToken, true);

      const userTwitter = await firebase.auth().getUser(verify.uid);

      const isUserExit = await this.userRepository.findOneBy({provider_type: ProviderType.TWITTER, provider_id: userTwitter.uid})
      if(isUserExit) {
        const {id, username, avatar, follows, blogs} = isUserExit
        const payload = { id, username };
        const appAccessToken = this.jwtService.sign(payload);
        return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
      } else {  
        const user = new User()
        user.avatar = userTwitter.photoURL;
        user.full_name = userTwitter.displayName
        user.email = userTwitter.email
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash('', user.salt)
        
        let uuid = ''
        while(true)
        {
          uuid = crypto.randomBytes(6).toString('hex');
          let isUsernameExit = await this.userRepository.findOneBy({username: 'user'+uuid})
          
          if(!isUsernameExit)
          break;
        }
        user.username = 'user'+uuid;
        user.provider_type = ProviderType.TWITTER
        user.provider_id = userTwitter.uid
        await user.save()
        
        // return a token that the React frontend can use to authenticate future requests
        const {id, username, avatar, follows, blogs} = user
        const payload = { id, username };
        const appAccessToken = this.jwtService.sign(payload);
        return { accessToken: appAccessToken, id, username, avatar, follows: [], blogs: [] };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
