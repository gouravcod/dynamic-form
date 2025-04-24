import { IsEmail, IsOptional, IsString, IsNotEmpty,Length, Matches,  } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
   @IsString()
   name: string;
 
   @IsNotEmpty()
   @IsEmail()
   email: string;
 
   @IsNotEmpty({ message: 'Phone number is required' })
   @Length(10, 10, { message: 'Phone number must be exactly 10 digits' })
   @Matches(/^[0-9]+$/, { message: 'Phone number must contain only digits' })
   phone: string;
   
   @IsNotEmpty()
   @IsString()
   address: string;
}
