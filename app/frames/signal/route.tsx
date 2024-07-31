/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { redirect } from "frames.js/core";
import { frames } from "../frames";
import { signal } from "../../services";

const handleRequest = frames(async (ctx) => {
  // const signalResp = await signal(ctx.request);

  const id = "3635-32"
  console.log("🚀 ~ handleRequest ~ id:", id)

  return {
    image: (
      <div tw="flex flex-col">
        <div style={{ fontFamily: "Sora", fontSize: "40", fontWeight: "bold" }} tw="flex">Signal confirmed!</div>
      </div>
    ),
    buttons: [
      <Button action="post" target={`/${id}`}>
        Back to post
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
