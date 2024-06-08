/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GeneratepdfController } from './generatepdf.controller';
import { GeneratepdfService } from './generatepdf.service';

@Module({
    controllers: [GeneratepdfController],
    providers:[GeneratepdfService]
})
export class GeneratepdfModule {}
