import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: process.env.MSSQL_DB_HOST || 'localhost',
        port: 1433,
        username: process.env.MSSQL_DB_USERNAME,
        password: process.env.MSSQL_DB_PASSWORD,
        database: 'DIT_UserAccount',
        // entities,
        autoLoadEntities: true,
        synchronize: true,
        logging: false,
        extra: {
          trustServerCertificate: true,
          options: {
            trustedConnection: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
