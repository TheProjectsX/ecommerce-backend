import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  role: string;

  @ApiProperty()
  @IsOptional()
  active: boolean;

  @ApiProperty()
  @IsOptional()
  isVerified: boolean;
}
