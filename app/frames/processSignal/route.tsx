// @ts-nocheck
/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "../frames";
import { signal, fetchBulkUsers } from "../../services";

function Pfp({ url }: any) {
  return (
    <div tw="flex h-[60px] w-[60px] mx-1 rounded-full">
      <img src={url} alt="Profile" tw="h-full w-full rounded-full flex" />
    </div>
  );
}

function formatNumberWithCommas(value: number) {
  const stringValue = value.toString();
  const [integerPart, decimalPart] = stringValue.split(".");
  // @ts-ignore
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
}

const frameHandler = frames(async (ctx) => {
  const { newSignalValue, signalValue, signalers, success } = await signal(
    ctx.request
  );

  const signaledUsers = await fetchBulkUsers(
    signalers && signalers.length
      ? // @ts-ignore
        signalers.slice(0, 7).map((s: any) => s.fid)
      : []
  );

  const message = () => {
    // @ts-ignore
    if (success) {
      return (
        <div tw="flex flex-col justify-center items-center">
          <div tw="text-center my-3">Signal Confirmed!</div>
          <div tw="mt-4 flex">
            {/* @ts-ignore */}
            Your signal: +{Math.round(signalValue)}
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
        tw="flex flex-col justify-center"
        style={{
          fontFamily: "'Sora', sans-serif",
        }}
      >
        {message()}
        <div tw="flex font-bold my-3 text-center justify-center">
          {success && "New"} Signal Score: {formatNumberWithCommas(Math.round(newSignalValue))}
        </div>
        {/* @ts-ignore */}
        {signaledUsers?.length > 0 && (
          <div tw="mt-6 flex justify-center">
            {/* @ts-ignore */}
            {signaledUsers.map((s: any, i: any) => {
              return (
                <div tw="flex justify-center" key={i}>
                  <Pfp url={s.pfp_url} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    ),
    buttons: [
      <Button action="post" target={`/${ctx.searchParams.activityId}`}>
        Back to post
      </Button>,
      <Button action="link" target="https://docs.onspotlight.app">
        Learn more ⇾
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
