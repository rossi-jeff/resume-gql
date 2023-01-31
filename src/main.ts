import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

const corsOptions = {
  origin: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: 'Content-Type, Accept',
  credentials: true,
};

async function bootstrap() {
  const port = config.get('server.port');
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  await app.listen(port);
  console.log(`starting server on port: ${port}`);
}
bootstrap();
