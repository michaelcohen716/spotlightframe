/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { redirect } from "frames.js/core";
import { frames } from "../frames";
import { signal, getCurrentSignal, fetchBulkUsers } from "../../services";

function Pfp({ url }: any) {
  return (
    <div tw="flex h-[60px] w-[60px] mx-1 rounded-full">
      <img src={url} alt="Profile" tw="h-full w-full rounded-full flex" />
    </div>
  );
}

const handleRequest = frames(async (ctx) => {
  // @ts-ignore
  const currentSignal = await getCurrentSignal(ctx.searchParams.activityId);
  console.log("currentSignal", currentSignal);

  const signalers = await fetchBulkUsers(
    currentSignal?.signals && currentSignal.signals.length
      ? currentSignal.signals.slice(0, 7).map((s: any) => s.fid)
      : []
  );
  console.log("signalers", signalers);
  return {
    image: (
      <div tw="flex flex-col items-center">
        <div tw="flex font-bold w-1/2 text-center justify-center">
          Signal Score:{" "}
          {formatNumberWithCommas(
            Math.round((currentSignal as any).signalValue)
          )}
        </div>
        {/* @ts-ignore */}
        {signalers?.length > 0 && (
          <div tw="w-1/2 mt-6 flex justify-center">
            {/* @ts-ignore */}
            {signalers.map((s: any, i: any) => {
              return (
                <div tw="flex justify-center">
                  <Pfp url={s.pfp_url} key={i} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    ),
    buttons: [
      <Button
        action="post"
        target={{
          pathname: "/processSignal",
          query: { activityId: ctx.searchParams.activityId },
        }}
      >
        Signal 🗣 this post
      </Button>,
      <Button action="post" target={`/${ctx.searchParams.activityId}`}>
        Back to post
      </Button>,
    ],
  };
});

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

export const GET = handleRequest;
export const POST = handleRequest;
