import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { CreateAccountDto } from './dto/create-account.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(createAccountDto: CreateAccountDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
        id: number;
        username: string;
        avatar: string;
        follows: any;
        blogs: any;
    }>;
    facebookAuth(body: {
        accessToken: string;
    }): Promise<{
        accessToken: string;
        id: number;
        username: string;
        avatar: string;
        follows: any;
        blogs: any;
    }>;
    googleAuth(body: {
        accessToken: string;
    }): Promise<{
        accessToken: string;
        id: number;
        username: string;
        avatar: string;
        follows: any;
        blogs: any;
    }>;
    twitterAuth(body: {
        accessToken: string;
    }): Promise<{
        accessToken: string;
        id: number;
        username: string;
        avatar: string;
        follows: any;
        blogs: any;
    }>;
    githubAuth(body: {
        accessToken: string;
    }): Promise<{
        accessToken: string;
        id: number;
        username: string;
        avatar: string;
        follows: any;
        blogs: any;
    }>;
}
