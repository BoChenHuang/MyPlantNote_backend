import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from 'src/database/schema/note';
import { JwtService } from '@nestjs/jwt';
import { PlantModule } from 'src/plant/plant.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]), PlantModule],
  controllers: [NoteController],
  providers: [NoteService, JwtService],
  exports: [NoteService]
})
export class NoteModule {}
