/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { redirect } from "frames.js/core";
import { frames } from "../frames";
import { signal } from "../../services";

const handleRequest = frames(async (ctx) => {
  const signalResp = await signal(ctx.request);
  console.log('ctx.searchParams', ctx.searchParams);
  return {
    image: (
      <div tw="flex flex-col">
        <div tw="flex">Signal confirmed!</div>
      </div>
    ),
    buttons: [
      <Button action="post" target={`/${ctx.searchParams.postId}`}>
        Back to post
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
