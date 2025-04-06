import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Note } from 'src/database/schema/note';
import { Logger } from 'winston';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NoteService {
    constructor(
        @InjectModel(Note.name) private noteModel: Model<Note>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) { }
    async create(createNoteDto: CreateNoteDto, userId: string) {
        const createNoteDao = {
            author: userId,
            ...createNoteDto
        }
        const note = new this.noteModel(createNoteDao);
        return await note.save();
    }
    async getById(id: string, userId: string) {
        const authorId = new Types.ObjectId(userId);
        const note = await this.noteModel.findOne({_id: id, author: authorId}).exec();

        return note
    }
    async updateById(id: string, updateNoteDto: UpdateNoteDto, userId: string) {
        const updateDate = new Date();
        const authorId = new Types.ObjectId(userId);
        const updateNoteDao = {
            ...updateNoteDto,
            updateAt: updateDate
        }
        const note = await this.noteModel.findOneAndUpdate({_id: id, author: authorId}, updateNoteDao, {new: true}).exec();

        return note;
    }
    async deleteById(id: string) {
        return await this.noteModel.findByIdAndDelete(id).exec();
    }
}
