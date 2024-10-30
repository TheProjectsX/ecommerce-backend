import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  role: string;

  @IsOptional()
  active: boolean;

  @IsOptional()
  isVerified: boolean;
}
