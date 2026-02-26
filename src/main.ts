import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_HOST || 'amqp://localhost:5672'],
      queue: process.env.RMQ_QUEUE || 'paymentx_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen();
  console.log('PaymentX Microservice is listening on paymentx_queue...');
}

bootstrap().catch((err) => {
  console.error('Failed to start PaymentX microservice:', err);
  process.exit(1);
});
