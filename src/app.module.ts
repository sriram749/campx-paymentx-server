import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FeeTypesModule } from './payments/fee-types/fee-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FeeTypesModule,
  ],
})
export class AppModule {}
