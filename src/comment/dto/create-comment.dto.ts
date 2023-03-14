import { IsNumber, IsOptional ,IsString, MinLength } from 'class-validator'
import { AccessMod } from '../../common/enum';
export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  content: string;

  @IsNumber()
  blogId: number; 

  @IsOptional()
  @IsNumber()
  parentId: number;  
} 
 
 