/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import {
  fetchBooking,
  fetchBulkUsers,
  fetchPreview,
  getCurrentSignal,
} from "../../services";
import { frames } from "../frames";
import InfoHeader from "./InfoHeader";

function Pfp({ url }: any) {
  return (
    <div tw="flex h-[50px] w-[50px] mx-1 rounded-full">
      <img src={url} alt="Profile" tw="h-full w-full rounded-full flex" />
    </div>
  );
}

const frameHandler = frames(async (ctx) => {
  const split = ctx.url.pathname.split("/");
  // console.log("🚀 ~ frameHandler ~ ctx.url:", ctx.url)
  const activityId = split[split.length - 1];
  if (!activityId) throw Error("Invalid param");
  const { content, booking } = await fetchBooking(activityId);

  const currentSignal = await getCurrentSignal(activityId);

  const bookerFid = Number((booking as any).bookerFid);
  const ownerFid = activityId.split("-")[0];
  const [ogData, users, signalers] = await Promise.all([
    fetchPreview(content.link),
    fetchBulkUsers([ownerFid, bookerFid]),
    fetchBulkUsers(
      currentSignal?.signals && currentSignal.signals.length
        ? currentSignal.signals.slice(0, 7).map((s: any) => s.fid)
        : []
    ),
  ]);

  const description = ogData.data.ogDescription;
  const siteName = ogData.data.ogSiteName || ogData.data.alIphoneAppName;
  const title = ogData.data.ogTitle;

  return {
    image: (
      <div
        tw="flex flex-col h-[1000px]"
        style={{
          fontFamily: "'Sora', sans-serif",
        }}
      >
        <InfoHeader users={users} booking={booking} />
        {ogData.preprocessedImage && (
          <img src={ogData.preprocessedImage} tw="flex w-full" />
        )}
        <div
          tw="py-4 px-5 flex flex-col"
          style={{
            backgroundColor: "#181A1C",
          }}
        >
          <div tw="text-[24px] text-[#9A9898] flex">{siteName}</div>
          <div tw="font-bold text-[34px] my-3 text-white flex">{title}</div>
          <div tw="flex text-[24px] text-[#CECDCD]">
            {description.slice(0, 75) + "..."}
          </div>
        </div>
        <div tw="flex justify-around text-[36px] items-center bg-[#181A1C] text-white pt-4 pb-6">
          <div tw="flex font-extrabold">
            Signal: {Math.round(currentSignal?.signalValue)}
          </div>

          {/* @ts-ignore */}
          {signalers?.length > 0 &&
            // @ts-ignore
            signalers.map((s: any, i: any) => {
              return (
                <div tw="flex justify-center">
                  <Pfp url={s.pfp_url} key={i} />
                </div>
              );
            })}
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
      width: 600,
      height: 600
    },
    buttons: [
      <Button action="link" target="https://docs.onspotlight.app">
        Learn more ⇾
      </Button>,
      <Button action="link" target={ogData.data.requestUrl}>
        See link
      </Button>,
      <Button
        action="post"
        target={{
          pathname: "/signal",
          query: { postId: activityId, fid: ownerFid },
        }}
      >
        Signal 🗣
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
