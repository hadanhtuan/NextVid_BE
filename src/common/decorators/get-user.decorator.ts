// get-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  user: string // or any other type
}

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req: IGetUserAuthInfoRequest = context.switchToHttp().getRequest();
    return req.user;
  },
);