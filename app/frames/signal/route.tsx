import { NextRequest } from "next/server";
import { frames } from "../frames";
import { signal } from "../../services";

export const POST = frames(async (ctx) => {
    console.log('signalctx', ctx);

  return Response.json({
    message: `The user's FID is ${ctx.message?.castId?.fid}`,
  });
});
