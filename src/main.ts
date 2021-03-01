import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RedisIoAdapter } from './v1/adapters/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = parseInt(process.env.SERVER_PORT);
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
