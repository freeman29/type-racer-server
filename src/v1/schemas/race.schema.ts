import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Racer, RacerSchema } from './racer.schema';

export type RaceDocument = Race & Document;

@Schema()
export class Race {
  @Prop({ type: [String] })
  words: string[];

  @Prop({ default: true })
  isOpen: boolean;

  @Prop({ default: false })
  isOver: boolean;

  @Prop({ type: [RacerSchema] })
  racers: Racer[];

  @Prop()
  startTime: number;
}

export const RaceSchema = SchemaFactory.createForClass(Race);
