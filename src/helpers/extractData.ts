import { PDFDocument } from "pdf-lib";

export async function ExtractData(file:File) {

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    const title = pdfDoc.getTitle() || "NA"; // This
    const author = pdfDoc.getAuthor() || "NA"; // This
    const pageCount = pdfDoc.getPages().length; // This

    return {title: title, author: author, pageCount: pageCount}
}