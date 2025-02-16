
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
    author: string;

    @Prop({ type: mongoose.Schema.Types.String, required: true})
    title: string;

    @Prop({ type: mongoose.Schema.Types.String, required: true})
    content: string;

    @Prop({ type: mongoose.Schema.Types.Date, default: Date.now })
    createAt: Date;

    @Prop({ type: mongoose.Schema.Types.Date, default: Date.now })
    updateAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
