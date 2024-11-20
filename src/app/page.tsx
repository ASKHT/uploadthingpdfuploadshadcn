"use client";

import { useState } from "react";
import {
  UploadButton,
  UploadDropzone,
  useUploadThing,
} from "@/lib/uploadthing";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const { startUpload } = useUploadThing("videoAndImage", {
    onBeforeUploadBegin: (files) => {
      console.log("Uploading", files.length, "files");
      return files;
    },
    onUploadBegin: (name) => {
      console.log("Beginning upload of", name);
    },
    onClientUploadComplete: (res) => {
      console.log("Upload Completed.", res.length, "files uploaded");
    },
    onUploadProgress(p) {
      console.log("onUploadProgress", p);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleManualUpload = async () => {
    if (file) {
      await startUpload([file]);
    }
  };

  return (
    <main className="container mx-auto p-4 space-y-4">
      {/* <div className="space-y-2">
        <Input type="file" onChange={handleFileChange} className="w-full" />
        <Button
          onClick={handleManualUpload}
          disabled={!file}
          className="w-full"
        >
          Manual Upload
        </Button>
      </div> */}

      <UploadButton
        endpoint="videoAndImage"
        onClientUploadComplete={(res) => {
          const pdfUrl = res[0].url;
          console.log("Uploaded PDF URL:", pdfUrl);
          alert("Upload Completed");
        }}
        onUploadBegin={() => {
          console.log("upload begin");
        }}
        config={{ appendOnPaste: true, mode: "manual" }}
      />

      {/* <UploadDropzone
        endpoint="videoAndImage"
        onUploadAborted={() => {
          alert("Upload Aborted");
        }}
        onClientUploadComplete={(res) => {
          console.log(`onClientUploadComplete`, res);
          alert("Upload Completed");
        }}
        onUploadBegin={() => {
          console.log("upload begin");
        }}
      /> */}
    </main>
  );
}
