import { IsNotEmpty, IsEmail, NotContains, Length, Matches, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateAccountDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  // @MinLength(8)
  // @MaxLength(20) 
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z  ])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  password: string; 

  @IsString()
  @MinLength(6)
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  avatar: string;

} 

