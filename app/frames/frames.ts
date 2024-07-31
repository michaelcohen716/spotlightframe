import { createFrames } from "frames.js/next";
import { farcasterHubContext } from "frames.js/middleware";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { ImageWorkerOptions } from "frames.js/middleware/images-worker/handler";

type State = {
  hasSignaled: boolean;
};

export const frames = createFrames<State>({
  basePath: "/frames",
  initialState: { hasSignaled: false },
  middleware: [farcasterHubContext()],
  debug: process.env.NODE_ENV === "development",
  imageRenderingOptions: async (): Promise<Omit<ImageWorkerOptions, "secret">> => {
    const soraFonts = [
      { file: "Sora-Bold.ttf", weight: 700 },
      { file: "Sora-ExtraBold.ttf", weight: 800 },
      { file: "Sora-ExtraLight.ttf", weight: 200 },
      { file: "Sora-Light.ttf", weight: 300 },
      { file: "Sora-Medium.ttf", weight: 500 },
      { file: "Sora-Regular.ttf", weight: 400 },
      { file: "Sora-SemiBold.ttf", weight: 600 },
      { file: "Sora-Thin.ttf", weight: 100 }
    ] as const;

    const fontPromises = soraFonts.map(async ({ file, weight }) => {
      const data = await fs.readFile(path.join(process.cwd(), "public", "Sora", file));
      return { name: "Sora", data, weight } as const;
    });

    const fonts = await Promise.all(fontPromises);

    return {
      imageOptions: { fonts }
    };
  },
});