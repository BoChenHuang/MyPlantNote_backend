
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PlantDocument = HydratedDocument<Plant>;

@Schema()
export class Plant {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
    owner: string;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], required: false, ref: 'images.files' })
    images: string;

    @Prop({ type: mongoose.Schema.Types.String, required: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.String, required: true })
    description: string;

    @Prop({ type: mongoose.Schema.Types.Date, default: Date.now })
    createAt: Date;

    @Prop({ type: mongoose.Schema.Types.Date, default: Date.now })
    updateAt: Date;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
