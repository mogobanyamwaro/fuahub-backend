import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { join } from 'path';
import { BackendUsersModule } from '@mamafuahub/backend/users';
@Module({
  imports: [
    BackendUsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
        synchronize: true,
        logging: process.env.NODE_ENV === 'development',
      }),
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class BackendCoreModule {}
