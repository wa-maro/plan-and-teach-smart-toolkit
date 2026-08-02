import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AcademicModule } from './features/academic/academic.module';
import { PreferenceModule } from './preference/preference.module';
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
        DATABASE_URL: Joi.string()
          .pattern(/^postgres(ql)?:\/\//)
          .required()
          .messages({
            'string.pattern.base':
              'DATABASE_URL must be a valid PostgreSQL connection string',
          }),
      }),
      validationOptions: {
        abortEarly: process.env.NODE_ENV === 'production',
      },
    }),
    PrismaModule,
    AcademicModule,
    PreferenceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
