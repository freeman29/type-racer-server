import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    MongooseModule.forRoot('mongodb://localhost:27017/type-racer'), 
    V1Module,
  ],
})
export class AppModule {}
