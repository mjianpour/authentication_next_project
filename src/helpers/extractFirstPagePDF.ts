import { PDFDocument } from 'pdf-lib'

export async function firstPageToBase64(file: File) {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const newDoc = await PDFDocument.create();
        const [firstPage] = await newDoc.copyPages(pdfDoc, [0]);
        newDoc.addPage(firstPage);
        const pdfBytes = await newDoc.save();

        return `data:application/pdf;base64,${Buffer.from(pdfBytes).toString('base64')}`;
}