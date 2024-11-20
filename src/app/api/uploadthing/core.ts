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
      // Check some condition based on the incoming requrest
      // if (!req.headers.get("x-some-header")) {
      //   throw new Error("x-some-header is required");
      // }

      // (Optional) Label your files with a custom identifier
      const filesWithMyIds = files.map((file, idx) => ({
        ...file,
        customId: `${idx}-${randomUUID()}`,
      }));

      // Return some metadata to be stored with the file
      return { foo: "bar" as const, [UTFiles]: filesWithMyIds };
    })
    .onUploadComplete(({ file }) => {
      console.log("upload completed", file);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
