import { IsString, IsOptional, IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @Length(10, 10)
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
