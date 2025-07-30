
import mongoose, { Mongoose } from "mongoose";

const bookSchema = new mongoose.Schema({
    username: {
        fileName: {
            fileType: {
                type: String,
                enum: ['pdf', 'epub']
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
            Metadata: {
                title: String,
                author: String,
                pageCount: Number
            },
            fileData: {
                type: Buffer, // Binary data storage
                required: true
            }
        },
    },
})


const Book = mongoose.models.books || mongoose.model("books", bookSchema); 

export default Book