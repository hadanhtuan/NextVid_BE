import { IsNumber, IsOptional ,IsString, MinLength } from 'class-validator'
export class DeleteCommentDto {
  @IsOptional()
  @IsNumber()
  blogId: number; 

  @IsOptional()
  @IsNumber()
  commentId: number; 
} 
 
 