/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path'

@Injectable()
export class GeneratepdfService {
    constructor(
    ) { }
    async generatePdf(htmlContent: string) {
        try {
            const browser = await chromium.launch();
            const page = await browser.newPage();
            await page.setContent(htmlContent);
            const pdfBuffer = await page.pdf({
                format: 'A4',
                margin: {
                    top: '5mm',
                    right: '5mm',
                    bottom: '5mm',
                    left: '5mm'
                }
            });

            const pdfFileName = 'generated.pdf';
            const pdfDirPath = path.join(__dirname, '..', 'public', 'pdfs');
            const pdfFilePath = path.join(pdfDirPath, pdfFileName);

            if (!fs.existsSync(pdfDirPath)) {
                fs.mkdirSync(pdfDirPath, { recursive: true });
            }

            fs.writeFileSync(pdfFilePath, pdfBuffer);
            await browser.close();
            return pdfFilePath;
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    }
}
