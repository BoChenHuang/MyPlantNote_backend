import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';


export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({description: "The email of user."})
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    @MinLength(3)
    @ApiProperty({description: "The password of user."})
    password: string;
}