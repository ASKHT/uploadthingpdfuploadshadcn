import { randomUUID } from "crypto";

import { createUploadthing, UTFiles } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";

const f = createUploadthing({
  errorFormatter: (err) => {
    console.log("Error uploading file", err.message);
    console.log("  - Above error caused by:", err.cause);

    return { message: err.message };
  },
});

export const uploadRouter = {
  videoAndImage: f({
    pdf: {
      maxFileSize: "4GB",
    },
  })
    .middleware(({ files }) => {
      const filesWithMyIds = files.map((file, idx) => ({
        ...file,
        customId: `${idx}-${randomUUID()}`,
      }));

      // Return some metadata to be stored with the file
      return { foo: "bar" as const, [UTFiles]: filesWithMyIds };
    })
    .onUploadComplete(({ file }) => {
      const pdfUrl = file.url;
      console.log("PDF URL:", pdfUrl);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
