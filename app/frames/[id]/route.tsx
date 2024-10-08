// @ts-nocheck
/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { fetchBooking, fetchBulkUsers, fetchPreview } from "../../services";
import { frames } from "../frames";
import InfoHeader from "./InfoHeader";

const frameHandler = frames(async (ctx) => {
  const split = ctx.url.pathname.split("/");
  const activityId = split[split.length - 1];
  if (!activityId) throw Error("Invalid param");
  const { content, booking } = await fetchBooking(activityId);

  const bookerFid = Number((booking as any).bookerFid);
  const ownerFid = activityId.split("-")[0];
  const [ogData, users] = await Promise.all([
    fetchPreview(content.link),
    fetchBulkUsers([ownerFid, bookerFid]),
  ]);

  const description = ogData.data.ogDescription;
  const siteName = ogData.data.ogSiteName || ogData.data.alIphoneAppName;
  const title = ogData.data.ogTitle;

  return {
    image: (
      <div
        tw="flex flex-col justify-center h-[1000px]"
        style={{
          fontFamily: "'Sora', sans-serif",
        }}
      >
        {/* <InfoHeader users={users} booking={booking} /> */}
        <div tw="items-center mt-[-24px] mb-5 flex justify-center text-[32px] text-[#CAC4D0]">
          <div
            style={{
              // not working for some reason
              fontStyle: "italic",
            }}
          >
            If you like this post, signal it below
          </div>
        </div>
        {ogData.preprocessedImage && (
          <img src={ogData.preprocessedImage} tw="" />
        )}
        <div
          tw="py-4 px-5 flex flex-col"
          style={{
            backgroundColor: "#181A1C",
          }}
        >
          <div tw="text-[28px] text-[#9A9898] flex">{siteName}</div>
          <div tw="font-bold text-[36px] my-3 text-white flex">{title}</div>
          {description?.length > 0 && (
            <div tw="flex text-[28px] text-[#CECDCD]">
              {description.slice(0, 100) + "..."}
            </div>
          )}
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    buttons: [
      <Button action="link" target={ogData.data.requestUrl}>
        See link
      </Button>,
      <Button action="link" target="https://onspotlight.app">
        Go to Spotlight
      </Button>,
      <Button
        action="post"
        target={{
          pathname: "/processSignal",
          query: { activityId },
        }}
      >
        Signal 🗣 this post
      </Button>,
    ],
    title: 'Spotlight Frame'
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
