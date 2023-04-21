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
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1234',
        database: 'mamafua',
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
