import { IsNotEmpty, IsEmail, NotContains, Length, Matches, IsBoolean, IsString, MaxLength, MinLength } from 'class-validator'
import { AccessMod } from '../../common/enum';
export class CreateBlogDto {
  @IsString()
  @MinLength(4)
  caption: string;

  @IsString()
  @MinLength(8)
  video: string; 


  @IsString()
  access_modifier: AccessMod;  //enum

  @IsBoolean()
  allow_comment: boolean;  // enum
} 

