import { createFrames } from "frames.js/next";
import { farcasterHubContext, openframes } from "frames.js/middleware";
// import * as fs from "node:fs/promises";
// import * as path from "node:path";

type State = {
  hasSignaled: boolean;
};

export const frames = createFrames<State>({
  basePath: "/frames",
  initialState: { hasSignaled: false },
  middleware: [farcasterHubContext()],
  debug: process.env.NODE_ENV === "development",
  // imageRenderingOptions: async () => {
    // const soraFont = fetch(
    //   new URL("/public/Sora-VariableFont_wght.ttf", import.meta.url)
    // ).then((res) => res.arrayBuffer());
    // const soraFont = fs.readFile(
    //   path.join(path.resolve(process.cwd(), "public"), "Sora-VariableFont_wght.ttf")
    // );

    // const [soraFontData] = await Promise.all([soraFont]);
    // return {
    //   imageOptions: {
    //     fonts: [
    //       {
    //         name: "Sora",
    //         data: soraFontData,
    //         weight: 400,
    //       },
    //     ],
    //   },
    // };
  // },
});
