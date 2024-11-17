import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER, WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { Logger } from 'winston';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import config from './config/config';


@Module({
  imports: [ConfigModule.forRoot({
    load: [config],
    isGlobal: true,
  }), WinstonModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      level: configService.get<string>('LOG_LEVEL')
        ? configService.get<string>('LOG_LEVEL')
        : 'debug',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.DailyRotateFile({
          filename: 'log/My-plant-Note-backend-%DATE%.log',
          zippedArchive: true,
          maxSize: '20m',
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('My-plant-Note-backend', {
              colors: true,
              prettyPrint: true,
              processId: true,
            }),
          ),
        }),
      ],
    }),
    inject: [ConfigService],
  }), MongooseModule.forRootAsync(
    {
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService, logger: Logger) => (
        {
          uri: configService.get<string>('database.url'),
          dbName: configService.get<string>('database.db'),
          connectionFactory: connection => {
            connection.on('connected', () => {
              logger.log('info', 'MongoDB is connected');
            });
            connection.on('disconnected', () => {
              logger.log('info', 'MongoDB disconnected');
            });
            connection.on('error', error => {
              logger.error('DB connection failed! for error: ', error)
            });
            connection._events.connected();
            return connection;
          }
        }
      ),
      inject: [ConfigService, WINSTON_MODULE_PROVIDER],
    }
  ), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
