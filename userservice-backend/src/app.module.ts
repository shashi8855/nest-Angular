/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { GeneratepdfController } from './generatepdf/generatepdf.controller';
import { GeneratepdfService } from './generatepdf/generatepdf.service';
import { GeneratepdfModule } from './generatepdf/generatepdf.module';

@Module({
  imports: [UserModule, DatabaseModule, GeneratepdfModule],
  providers: [GeneratepdfService],
  controllers: [GeneratepdfController],
})
export class AppModule {}
