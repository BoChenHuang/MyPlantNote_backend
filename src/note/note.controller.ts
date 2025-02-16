import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateNoteDto } from './dto/create-note.dto';
import { isValidObjectId } from 'mongoose';

@Controller('note')
export class NoteController {
    constructor(
        private readonly noteService: NoteService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('create')
    async create(@Body() createNoteDto: CreateNoteDto, @Request() req) {
        try {
            const userId: string = req.user.id;
            return await this.noteService.create(createNoteDto, userId);
        } catch (error) {
            this.logger.error(error.stack);
            throw error;
        }
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateNoteDto: CreateNoteDto, @Request() req) {
        try {
            const userId: string = req.user.id;

            if (!isValidObjectId(id) || !isValidObjectId(userId))
                throw new BadRequestException(`Id: ${id} is not valid.`);

            return await this.noteService.updateById(id, updateNoteDto, userId);
        } catch (error) {
            this.logger.error(error.stack);
            throw error;
        }
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string, @Request() req) {
        try {
            if (!isValidObjectId(id))
                throw new BadRequestException(`Id: ${id} is not valid.`);
            const userId: string = req.user.id;
            return await this.noteService.getById(id, userId);
        } catch (error) {
            this.logger.error(error.stack);
            throw error;
        }
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            if (!isValidObjectId(id))
                throw new BadRequestException(`Id: ${id} is not valid.`);

            return await this.noteService.deleteById(id);
        } catch (error) {
            this.logger.error(error.stack);
            throw error;
        }
    }
}
