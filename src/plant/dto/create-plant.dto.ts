import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';


export class CreatePlantDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "The name of plant." })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "The description of plant." })
    description: string;

    @IsArray()
    @ApiProperty({ description: "The images of plant." })
    images?: string[];
}