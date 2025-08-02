import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Book from "@/models/BookModel";

// Add await to connect or handle connection properly
export async function POST(request: NextRequest) {
  try {
    await connect(); // Connect here to ensure connection
    
    const reqBody = await request.json();
    const { username, name, type, size, firstPageViewer, uploadDate, title, author, pageCount } = reqBody;

    if (!username || !name) {
      return NextResponse.json({message: "Missing required fields"}, {status: 400});
    }

    // Check if file exists for this user
    const userExists = await Book.findOne({ username });

    if (userExists) {
      const bookExists = await Book.findOne({
        username,
        "files.fileName": name // Simplified query
      }); 

      if (bookExists) {
        return NextResponse.json({message: "File already exists."}, {status: 409});
      }

      const updateResult = await Book.updateOne(
        { username },
        {
          $push: {
            files: {
              fileName: name,
              fileType: type,
              fileSize: size,
              firstPageViewer,
              uploadDate,
              metadata: { title, author, pageCount }
            }
          }
        }
      );

      if (updateResult.modifiedCount > 0) {
        return NextResponse.json({message: "Book added to database successfully"}, {status: 200});
      }
      return NextResponse.json({message: "Failed to update book"}, {status: 400});
    } else {
      const newBook = new Book({
        username: username,
        files: [{
          fileName: name,
          fileType: type,
          fileSize: size,
          firstPageViewer,
          uploadDate,
          metadata: { title, author, pageCount }
        }]
      });

      const savedBook = await newBook.save();
      return NextResponse.json({message: "File saved successfully"}, {status: 200});
    }
  } catch (err: any) {
    console.error("Database error:", err);
    return NextResponse.json({error: err.message}, {status: 500});
  }
}


export async function GET(request: NextRequest) {

    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');

        const user = await Book.findOne({username})

        if (user) {
            const files = user.files;

            if (user.files.length == 0) {
              return NextResponse.json(
                { books: []}, // Return empty array of books
                { status: 200 })
            }

            const books = []
            for (const file of files) {
                books.push({name: file.fileName, firstPageViewer: file.firstPageViewer})
            }

            return NextResponse.json(
                { books }, // Return empty array of books
                { status: 200 })

        } else {
            return NextResponse.json(
                { books: [] }, // Return empty array if no books found
                { status: 200 })
        }

    } catch (err: any) {
        return NextResponse.json({error: err.message}, {status: 500})
    }
}
