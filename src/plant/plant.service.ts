import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Plant } from 'src/database/schema/plant';
import { Logger } from 'winston';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { Note } from 'src/database/schema/note';

@Injectable()
export class PlantService {
    constructor(
        @InjectModel(Plant.name) private plantModel: Model<Plant>,
        @InjectModel(Note.name) private noteModel: Model<Note>,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) { }
    async create(createPlantDto: CreatePlantDto, userId: string) {
        const createPlantDao = {
            owner: userId,
            ...createPlantDto
        }
        const plant = new this.plantModel(createPlantDao);
        return await plant.save();
    }

    async getById(id: string, userId: string) {
        const ownerId = new Types.ObjectId(userId);
        const note = await this.plantModel.findOne({_id: id, owner: ownerId}).exec();

        return note
    }

    async updateById(id: string, updateNoteDto: UpdatePlantDto, userId: string) {
        const updateDate = new Date();
        const authorId = new Types.ObjectId(userId);
        const updatePlantDao = {
            ...updateNoteDto,
            updateAt: updateDate
        }
        const note = await this.plantModel.findOneAndUpdate({_id: id, owner: authorId}, updatePlantDao, {new: true}).exec();

        return note;
    }
    async deleteById(id: string) {
        // delete notes of plant
        const notes = await this.noteModel.find({plant: id});
        notes.forEach(async (note) => {
            await this.noteModel.findByIdAndDelete(note.id);
        })
        const plant = await this.plantModel.findByIdAndDelete(id);
        return plant;
    }
}
