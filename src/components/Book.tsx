"use client"

type BookProps = {
    bookName: string
}

export default function Book({bookName}: BookProps) {
    return(
        <div>
            <h1>{bookName}</h1>
        </div>
    )
}