// @ts-nocheck
import { Button } from "frames.js/next";
import { frames } from "../frames";
import { signal } from "../../services";

const frameHandler = frames(async (ctx) => {
  const signalResp = await signal(ctx.request);
  console.log("signalResp", signalResp);
  const message = () => {
    // @ts-ignore
    if (signalResp.success == true) {
      return (
        <div tw="flex flex-col justify-center">
          <div>Confirmed!</div>
          <div className="mt-4">
            {/* @ts-ignore */}
            ++ {Math.round(signalResp.signalValue)} signal score!
          </div>
        </div>
      );
    }

    return (
      <div tw="flex flex-col justify-center">
        {/* @ts-ignore */}
        You&apos;ve already signaled this post 🙏
      </div>
    );
  };
  return {
    image: (
      <div
        tw="flex flex-col justify-center h-[1000px]"
        style={{
          fontFamily: "'Sora', sans-serif",
        }}
      >
        {message()}
      </div>
    ),
    buttons: [
      <Button action="post" target={`/${ctx.searchParams.activityId}`}>
        Back to post
      </Button>,
      <Button
        action="post"
        target={{
          pathname: "/signal",
          query: { activityId: ctx.searchParams.activityId },
        }}
      >
        Back to signal page
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
