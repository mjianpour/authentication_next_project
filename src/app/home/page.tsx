"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Book from "@/components/Book";
import { useEffect, useState } from "react";
import { firstPageToBase64 } from "@/helpers/extractFirstPagePDF";
import { ExtractData } from "@/helpers/extractData";

interface TokenData {
  id: string;
  username: string;
  email: string;
  displayName: string;
}

interface metaData {
  title: string,
  author: string,
  pageCount: number
}

export default function Home() {
  const router = useRouter();

  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadTime, setUploadTime] = useState<string | null>(null);
  const [firstPage, setFirstPage] = useState<string | null>(null); // ✅ Proper hook placement & initial  value

  const [metaData, setMetaData] = useState<metaData>({
    title: "NA",
    author: "NA",
    pageCount: 0
  })

  // Handle logout
  async function handleLogOut() {
    try {
      await axios.get("/api/logout");
      console.log("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // Fetch user data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<TokenData>("/api/me");
        setTokenData(res.data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    fetchData();
  }, []);

  // Convert first page to base64 when file changes
  useEffect(() => {
    const convertToBase64 = async () => {
      if (!file) return;
      try {
        const base64 = await firstPageToBase64(file);
        setFirstPage(base64 ?? null); // ✅ Safely handle result
      } catch (error) {
        console.error("Error converting first page:", error);
        setFirstPage(null);
      }
    };
    convertToBase64();
  }, [file]);

  useEffect(() => {
  if (!file) return;
  const fileData = async () => {
    try {
      const takenMetaData = await ExtractData(file);
      setMetaData(takenMetaData);
    } catch (error) {
      console.error(error);
    }
  };
  fileData(); // ← Actually invoke it!
}, [file]);


  // Early return while loading
  if (!tokenData) return <div>Loading...</div>;
  const { displayName, email } = tokenData;

  // File selection handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const isValidFile = (
      selectedFile.type.match(/(pdf|epub)/) ||
      selectedFile.name.match(/\.(pdf|epub)$/i)
    );

    if (!isValidFile) {
      alert("Please select only PDF or EPUB files");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
    setUploadTime(new Date().toISOString());
  };

  return (
    <div>
      <img src="untitled-1.png" width="70px" alt="Logo" />
      <span>☰</span>

      <div className="user-info">
        <h1>👑</h1>
        <img src="profile.png" width="40px" alt="Profile" />
        <h1>{displayName}</h1>
        <h1>{email}</h1>
      </div>

      <br/><hr/>

      <div className="nav-bar">
        <span>Store</span>
        <span>Practice</span>
        <span>Dictionary</span>
        <span>Search</span>
      </div>

      <br/>
      <div className="Books">
        <Book bookName="Once upon a time in America" />
        <Book bookName="Quantum Mechanics 1" />
        <Book bookName="Quantum Mechanics 2" />
      </div>

      <label htmlFor="add-file">📁 Add file</label>
      <input 
        type="file" 
        accept=".pdf,.epub,application/pdf,application/epub+zip"
        id="add-file" 
        className="hidden"
        onChange={handleFileChange}
      />

      <br/><br/><hr/>
      <Link href="/introduction">Libe Documentations</Link>
      <br/>
      <button onClick={handleLogOut}>Logout</button>

      <br/><br/>      
      <div className="file-info">
        <h1>{file?.name}</h1>
        <h1>{file?.size}</h1>
        <h1>{file?.type}</h1>
        <h1>{uploadTime}</h1>
        <h1>{firstPage}</h1>
        <h1>{metaData.title}</h1>
        <h1>{metaData.author}</h1>
        <h1>{metaData.pageCount}</h1>
      </div>
    </div>
  );
}
