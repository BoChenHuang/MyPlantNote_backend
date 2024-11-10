
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({type: mongoose.Schema.Types.String, required: true})
    name: string;
  
    @Prop({type: mongoose.Schema.Types.String, required: true})
    email: string;
  
    @Prop({type: mongoose.Schema.Types.String, required: true})
    password: string;

    @Prop({ type: mongoose.Schema.Types.Date, default: Date.now })
    createAt: Date;

    @Prop({ type: mongoose.Schema.Types.Date, default: Date.now })
    updateAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
