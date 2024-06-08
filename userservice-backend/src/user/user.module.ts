/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { databaseProviders } from '../database/database.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...databaseProviders],
})
export class UserModule {}
