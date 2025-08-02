
import mongoose, { Mongoose } from "mongoose";

const bookSchema = new mongoose.Schema({
    username: {
        type: String
    }, 
    files: [
        {
            fileName: {
                type: String
            },
            fileType: {
                type: String,
                enum: ['application/pdf', 'application/epub+zip', 'pdf', 'epub']
            },
            fileSize: {
                type: Number
            },
            firstPageViewer: {
                type: String
            },
            uploadDate: {
                type: Date
            },  
            metadata: {
                title: String,
                author: String,
                pageCount: Number
            },
        }
    ],
})

const Book = mongoose.models.books || mongoose.model("books", bookSchema); 

export default Book