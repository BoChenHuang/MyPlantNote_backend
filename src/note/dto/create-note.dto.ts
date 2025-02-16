import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';


export class CreateNoteDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "The title of note." })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "The content of note." })
    content: string;
}