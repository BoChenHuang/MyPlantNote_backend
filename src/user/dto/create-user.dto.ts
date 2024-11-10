import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';


export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "The name of user."})
    name: string;

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