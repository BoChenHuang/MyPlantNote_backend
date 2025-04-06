import { Module } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Plant, PlantSchema } from 'src/database/schema/plant';
import { JwtService } from '@nestjs/jwt';
import { Note, NoteSchema } from 'src/database/schema/note';

@Module({
  imports: [MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }, { name: Note.name, schema: NoteSchema }])],
  controllers: [PlantController],
  providers: [PlantService, JwtService],
  exports: [PlantService]
})
export class PlantModule {}