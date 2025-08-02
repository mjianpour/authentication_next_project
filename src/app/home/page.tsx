"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { firstPageToBase64 } from "@/helpers/extractFirstPagePDF";
import { ExtractData } from "@/helpers/extractData";
import Book from "@/components/Book";

interface TokenData {
  id: string;
  username: string;
  email: string;
  displayName: string;
}

interface MetaData {
  title: string;
  author: string;
  pageCount: number;
}

interface book {
  name: string;
  firstPageViewer: string;
}

export default function Home() {
  const router = useRouter();
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [books, setBooks] = useState<book[]>([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get<TokenData>("/api/me");
        setTokenData(res.data);
        await fetchBooks(res.data.username); // Load books immediately
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    fetchUserData();
  }, []);

  const fetchBooks = async (username: string) => {
    try {
      const response = await axios.get(`/api/books?username=${username}`);
      setBooks(response.data.books || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };

  useEffect(() => {
    const processAndUploadFile = async () => {
      if (!file || !tokenData?.username) return;
      
      setIsLoading(true);
      setUploadStatus("Processing file...");

      try {
        // Process file in sequence
        setUploadStatus("Extracting first page...");
        const firstPageBase64 = await firstPageToBase64(file);
        
        setUploadStatus("Extracting metadata...");
        const extractedMetaData = await ExtractData(file);
        
        if (!firstPageBase64) {
          throw new Error("Failed to convert first page");
        }

        setUploadStatus("Preparing upload...");
        const uploadData = {
          username: tokenData.username,
          name: file.name,
          type: file.type,
          size: file.size,
          firstPageViewer: firstPageBase64,
          uploadDate: new Date().toISOString(),
          title: extractedMetaData.title || "Untitled",
          author: extractedMetaData.author || "Unknown",
          pageCount: extractedMetaData.pageCount || 0
        };

        setUploadStatus("Uploading to server...");
        const response = await axios.post("/api/books", uploadData);

        if (response.status === 200) {
          setUploadStatus("Upload successful!");
          setTimeout(() => setUploadStatus(null), 3000);

          // This is where I'm refreshing the list
          const getBooks = async (username: string) => {
            try {
              const response = await axios.get(`/api/books?username=${username}`);
              return response.data.books; // Returns array of books
            } catch (error) {
              console.error("Error fetching books:", error);
              return []; // Fallback empty array
            }
          };

          const updatedBooks = await getBooks(tokenData.username);
          setBooks(updatedBooks);

        } else {
          throw new Error(response.data.message || "Upload failed");
        }
      } catch (error: any) {
        console.error("Upload process failed:", error);
        setUploadStatus(`Error: ${error.response?.data?.error || error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    processAndUploadFile();
  }, [file, tokenData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const isValidFile = selectedFile.type.match(/(pdf|epub)/) || 
                       selectedFile.name.match(/\.(pdf|epub)$/i);

    if (!isValidFile) {
      alert("Please select only PDF or EPUB files");
      e.target.value = "";
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
      alert("File size exceeds 50MB limit");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleLogOut = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout error:", error.message);
    }
  };

  if (!tokenData) return <div>Loading user data...</div>;

  return (
    <div className="container">
      <header className="header">
        <img src="untitled-1.png" width="70px" alt="Logo" />
        <span className="menu-icon">☰</span>
      </header>

      <div className="user-info">
        <h1>👑</h1>
        <img src="profile.png" width="40px" alt="Profile" />
        <h1>{tokenData.displayName}</h1>
        <h1>{tokenData.email}</h1>
      </div>

      <hr className="divider" />

      <nav className="nav-bar">
        <span>Store </span>
        <span>Practice </span>
        <span>Dictionary </span>
        <span>Search</span>
      </nav>

      <br/>
      <div>
        {books.map((book) => <Book 
          key={book.name}
          bookName={`${book.name}`} 
          firstPageViewer={`${book.firstPageViewer}`}>
        </Book>)}
      </div>
      <br/>

      <div className="upload-section">
        <label htmlFor="file-upload" className="upload-button">
          📁 Add file
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.epub,application/pdf,application/epub+zip"
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading}
        />

        {file && (
          <div className="file-info">
            <p>Selected: {file.name}</p>
            <p>Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}

        {uploadStatus && <div className="status-message">{uploadStatus}</div>}
      </div>

      <footer className="footer">
        <hr className="divider" />
        <Link href="/introduction">Libe Documentations</Link>
        <br/>
        <button onClick={handleLogOut} className="logout-button">
          Logout
        </button>
      </footer>
    </div>
  );
}