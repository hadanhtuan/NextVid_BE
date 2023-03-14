import { Request } from 'express';
export interface IGetUserAuthInfoRequest extends Request {
    user: string;
}
export declare const GetUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
