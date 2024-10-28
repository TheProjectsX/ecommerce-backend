import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsPhoneNumber()
  @IsOptional()
  number: string;

  @IsOptional()
  role: string;

  @IsOptional()
  isVerified: boolean;
}
