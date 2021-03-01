import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RacerDocument = Racer & Document;

@Schema()
export class Racer {
  @Prop({ default: 0 })
  currentWordIndex: number;

  @Prop()
  socketId: string;

  @Prop({ default: false })
  isPartyLeader: boolean;

  @Prop({ default: -1 })
  wpm: number;

  @Prop()
  name: string;
}

export const RacerSchema = SchemaFactory.createForClass(Racer);
