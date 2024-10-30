import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

class Address {
  @IsOptional()
  street: string;

  @IsOptional()
  city: string;

  @IsOptional()
  state: string;

  @IsOptional()
  postalCode: string;

  @IsOptional()
  country: string;
}

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

  @IsOptional()
  address: Address;
}
