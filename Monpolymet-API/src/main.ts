import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  // Serve uploaded images (e.g. the CEO portrait) at /uploads/<file>.
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads/' });

  const config = app.get(ConfigService);

  const corsOrigins = config.get<string>('CORS_ORIGINS', 'http://localhost:5173,http://localhost:5174')
    .split(',')
    .map(origin => origin.trim());
  
  try {
    const fs = require('fs');
    const path = require('path');
    fs.writeFileSync(
      path.join(process.cwd(), 'cors-debug.txt'),
      JSON.stringify({
        corsOrigins,
        processEnv: process.env.CORS_ORIGINS,
        cwd: process.cwd()
      }, null, 2)
    );
  } catch (e) {
    console.error('Failed to write CORS debug file:', e);
  }

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(config.get<number>('PORT', 4000));
}
void bootstrap();
