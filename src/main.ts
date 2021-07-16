import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Resultintercepotor } from './common/interceptor/Resultintercepotor';
import { AllExceptionFilter } from './common/filter/ExceptionFilter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
    .setTitle('itemall项目接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //跨域
  app.enableCors();
  //全局拦截器=>处理成功操作
  app.useGlobalInterceptors(new Resultintercepotor());
  //全局异常过滤器 =>失败操作，或者异常问题
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(3000);
}
bootstrap();
