"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
// import { Input } from "postcss";
import React, { ChangeEvent, useState } from "react";

const PdfTextExtract = () => {
  // const [file, setFile] = useState(null);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    bio: "",
  });

  // const handleFileChange = (event:any) => {
  //   setFile(event.target.files[0]);
  // };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(() => selectedFile);
    }
  };
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData2 = new FormData();
    formData2.append("resume", file);
    formData2.append("firstname", formData.firstname);
    formData2.append("lastname", formData.lastname);
    formData2.append("email", formData.email);
    formData2.append("bio", formData.bio);

    try {
      const response = await axios.post(
        "http://localhost:3009/api/text/upload",
        formData2,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setText(response.data.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>PDF Text Extractor</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <div>
        <label>First Name:</label>
        <textarea
          name="firstname"
          value={formData.firstname}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <textarea
          name="lastname"
          value={formData.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <textarea
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Bio:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={handleSubmit}>Upload and Extract</button>
      <div>
        <h2>Extracted Text:</h2>
        <div className="text-container">{text}</div>
      </div>
    </div>
  );
};

export default PdfTextExtract;

// "use client";
// import { FilePond } from "react-filepond";
// import "filepond/dist/filepond.min.css";
// import { useState } from "react";

// export default function FileUpload() {
//   return (
//     <FilePond
//       server={{
//         process: "/api/pdftotext",
//         fetch: null,
//         revert: null,
//       }}
//     />
//   );
// }
