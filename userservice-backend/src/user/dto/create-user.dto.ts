import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @Length(10, 10)
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
