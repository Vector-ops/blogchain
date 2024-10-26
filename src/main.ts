import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,

      // eliminates @Type() decorators in the DTOs
      // transformOptions:{
      //   enableImplicitConversion: true
      // }
    }),
  );

  // Swagger config

  const config = new DocumentBuilder()
    .setTitle('BlogChain Documentation')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService(
      "You are lucky there's no terms of services for this api",
    )
    .setLicense(
      'MIT License',
      'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt',
    )
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // cors
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
