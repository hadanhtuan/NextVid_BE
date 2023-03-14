declare const GoogleAuthService_base: new (...args: any[]) => any;
export declare class GoogleAuthService extends GoogleAuthService_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<{
        userId: any;
        email: any;
    }>;
}
export {};
