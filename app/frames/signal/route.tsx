/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { redirect } from "frames.js/core";
import { frames } from "../frames";
import { signal } from "../../services";

const handleRequest = frames(async (ctx) => {
  const signalResp = await signal(ctx.request);
  console.log("signalResp", signalResp);
  // console.log('ctx', ctx);

  const message = () => {
    if (signalResp?.message == "Invalid action") {
      return "Invalid signal"
    }
    
  };

  return {
    image: (
      <div tw="flex flex-col">
        <div
          style={{ fontFamily: "Sora", fontSize: "40", fontWeight: "bold" }}
          tw="flex"
        >
          {message()}
        </div>
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
