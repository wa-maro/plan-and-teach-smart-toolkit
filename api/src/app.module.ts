import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().port().default(3000),
      }),
      validationOptions: {
        abortEarly: process.env.NODE_ENV === 'production',
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
