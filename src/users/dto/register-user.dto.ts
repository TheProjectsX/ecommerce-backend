import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  password: string;
}
