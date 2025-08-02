"use client"

type BookProps = {
    bookName: string,
    firstPageViewer: string
}

export default function Book({bookName, firstPageViewer}: BookProps) {
    return(
        <div>
            <img src="BG.jpg" alt="First Page" width={"132px"}/>
            <h1>{bookName}</h1> 
        </div>
    )
}