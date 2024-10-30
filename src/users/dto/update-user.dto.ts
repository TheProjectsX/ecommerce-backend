import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class Address {
  @ApiProperty()
  @IsOptional()
  street: string;

  @ApiProperty()
  @IsOptional()
  city: string;

  @ApiProperty()
  @IsOptional()
  state: string;

  @ApiProperty()
  @IsOptional()
  postalCode: string;

  @ApiProperty()
  @IsOptional()
  country: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsOptional()
  profilePicture: string;

  @ApiProperty()
  @IsOptional()
  address: Address;
}
