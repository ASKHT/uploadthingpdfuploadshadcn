import { createRouteHandler } from "uploadthing/next";
import { uploadRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
  config: {
    logLevel: "Debug",
    // handleDaemonPromise: "await",
  },
});