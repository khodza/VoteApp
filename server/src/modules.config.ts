import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from './redis.module';
import { Logger } from '@nestjs/common';

export const redisModule = RedisModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger();

    return {
      connectionsOptions: {
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      },
      onClientReady: (client) => {
        logger.log('Redis client ready');
        client.on('error', (err) => {
          logger.error('Redis client error', err);
        });
        client.on('connect', () => {
          logger.log(
            `Connected to redis on ${client.options.host}:${client.options.port}`,
          );
        });
      },
    };
  },
  inject: [ConfigService],
});
