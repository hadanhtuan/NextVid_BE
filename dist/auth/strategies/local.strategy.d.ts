import { AuthService } from '../auth.service';
import { AuthCredentialsDto } from '../dto/auth-credentials';
import { User } from '../../common/entities/user.entity';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(authCredentialsDto: AuthCredentialsDto): Promise<User>;
}
export {};
