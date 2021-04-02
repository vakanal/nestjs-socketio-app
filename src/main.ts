import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'error', 'warn'],
  });

  const configService = app.get(ConfigService);

  const port = configService.get('SERVER_PORT');

  app.setGlobalPrefix('api');

  await app.listen(port);
}
bootstrap();
