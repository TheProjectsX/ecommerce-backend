import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsOptional()
  profilePicture: string;

  @IsOptional()
  role: string;

  @IsOptional()
  isVerified: boolean;
}
