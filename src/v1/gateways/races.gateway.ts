import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { Race, RaceDocument } from '../schemas/race.schema';
import { Racer, RacerDocument } from '../schemas/racer.schema';
import { V1Service } from '../v1.service';

@WebSocketGateway()
export class RacesGateway implements OnGatewayInit, OnGatewayConnection {
  constructor(
    private service: V1Service,
    @InjectModel(Race.name) private raceModel: Model<RaceDocument>,
    @InjectModel(Racer.name) private racerModel: Model<RacerDocument>
  ) {}

  private logger: Logger = new Logger('RacesGateway');
  
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    this.logger.log('after init!')
  }

  handleConnection(client: Socket): void {
    return this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('create-race')
  async handleCreateGame(@MessageBody() racerName: string, @ConnectedSocket() client: Socket) {
    try {
      this.logger.log(racerName)
      
      const words: string[] = await this.service.getBaconWords();
      
      this.logger.log(`words ${words}`);

      let race = new this.raceModel();

      race.words = words;

      const racer = new this.racerModel({
        socketId: client.id,
        isPartyLeader: true,
        name: racerName
      });

      race.racers.push(racer);

      race = await race.save();

      const raceId = race._id.toString();

      client.join(raceId);

      this.server.to(raceId).emit('race-updated', race);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
