import { JwtPayload } from '../jwt-payload-interface';
import { AuthService } from '../auth.service';
declare const JsonWebTokenStrategy_base: new (...args: any[]) => any;
export declare class JsonWebTokenStrategy extends JsonWebTokenStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<import("../../common/entities/user.entity").User>;
}
export {};
