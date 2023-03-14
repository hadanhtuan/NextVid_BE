declare const FacebookAuthService_base: new (...args: any[]) => any;
export declare class FacebookAuthService extends FacebookAuthService_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<{
        userId: any;
        email: any;
    }>;
}
export {};
