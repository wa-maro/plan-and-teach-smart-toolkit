import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@prisma';
import * as Joi from 'joi';
import { AcademicModule } from './features/academic';
import { PreferenceModule } from './features/preference';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@common/interceptors';
import { GlobalExceptionFilter } from '@common/filters';
import { SecurityModule } from '@security/security.module';
import { UsersModule } from '@users';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),

        PORT: Joi.number().port().default(3000),

        DATABASE_URL: Joi.string()
          .pattern(/^postgres(ql)?:\/\//)
          .required()
          .messages({
            'string.pattern.base':
              'DATABASE_URL must be a valid PostgreSQL connection string',
          }),

        JWT_ACCESS_SECRET: Joi.string()
          .min(10)
          .required()
          .label('JWT_ACCESS_SECRET'),
        JWT_ACCESS_EXPIRES_IN: Joi.string().default('60s'),

        JWT_REFRESH_SECRET: Joi.string()
          .min(10)
          .required()
          .label('JWT_REFRESH_SECRET'),
        JWT_REFRESH_EXPIRES_IN: Joi.string().default('1h'),
      }),

      validationOptions: {
        abortEarly: process.env.NODE_ENV === 'production',
      },
    }),
    PrismaModule,
    AcademicModule,
    PreferenceModule,
    SecurityModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
