import { JwtService } from '@nestjs/jwt/dist';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { User } from '../common/entities/user.entity';
import { UserRepository } from '../common/repositories/user.repository';
import { CreateAccountDto } from './dto/create-account.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(createAccountDto: CreateAccountDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
        id: number;
        username: string;
        avatar: string;
        follows: import("../common/entities/user-relation.entity").UserRelation[];
        blogs: import("../common/entities/blog.entity").Blog[];
    }>;
    getUser(id: number): Promise<User>;
    validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<User>;
    facebookAuth(accessToken: string): Promise<{
        accessToken: string;
        id: number;
        username: string;
        avatar: string;
        follows: any[];
        blogs: any[];
    }>;
    googleAuth(accessToken: string): Promise<{
        accessToken: string;
        id: number;
        username: string;
        avatar: string;
        follows: any[];
        blogs: any[];
    }>;
    githubAuth(accessToken: string): Promise<{
        accessToken: string;
        id: number;
        username: string;
        avatar: string;
        follows: any[];
        blogs: any[];
    }>;
    twitterAuth(accessToken: string): Promise<{
        accessToken: string;
        id: number;
        username: string;
        avatar: string;
        follows: any[];
        blogs: any[];
    }>;
}
