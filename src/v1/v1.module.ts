import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RacesGateway } from './gateways/races.gateway';
import { Race, RaceSchema } from './schemas/race.schema';
import { Racer, RacerSchema } from './schemas/racer.schema';
import { V1Service } from './v1.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Race.name, schema: RaceSchema }, { name: Racer.name, schema: RacerSchema }])],
  providers: [V1Service, RacesGateway],
})
export class V1Module {}
