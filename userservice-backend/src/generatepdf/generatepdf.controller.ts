/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Res, HttpStatus, HttpException } from '@nestjs/common';
import { GeneratepdfService } from './generatepdf.service';
import * as path from 'path';
import { Response } from 'express';

@Controller('generatepdf')
export class GeneratepdfController {
    constructor(
        private pdfService: GeneratepdfService
    ) { }
    @Post()
    async generatePdf(@Body() element: any): Promise<any> {
        try {
            const { htmlContent } = await element
            const pdfFilePath = await this.pdfService.generatePdf(htmlContent)
            return {
                status: HttpStatus.OK,
                error: null,
                message: 'PDF generated successfully',
                data: {
                    pdfUrl: pdfFilePath
                },
            };
        } catch (error) {
            throw new HttpException('PDF generation failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async sendPdf(@Res() res: Response): Promise<any> {
        const pdfFilePath = await path.join(__dirname, '..', 'public', 'pdfs', 'generated.pdf');
        res.sendFile(pdfFilePath);
    }

    @Get('download')
    async download(@Res() res: Response): Promise<any> {
        const pdfFilePath = await path.join(__dirname, '..', 'public', 'pdfs', 'generated.pdf');
        res.download(pdfFilePath, 'generated_pdf.pdf');
    }
}
