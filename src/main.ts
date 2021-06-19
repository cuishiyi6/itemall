import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Resultintercepotor } from './common/interceptor/Resultintercepotor';
import { AllExceptionFilter } from './common/filter/ExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('itemall项目接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalInterceptors(new Resultintercepotor());

  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(3000);
}
bootstrap();
