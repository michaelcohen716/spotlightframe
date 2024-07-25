
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')


const formatPrice = (num: bigint) => {
  const ether = Number(num) / 1e18;
  return ether.toFixed(5);
};


function InfoHeader({ users, booking }: any) {
  if (!users?.length) return null;
  const [owner, booker] = users;
  return (
    <div
      tw="flex px-4 py-8 justify-between"
      style={{
        marginTop: "-60px",
      }}
    >
      <div tw="flex">
        <div tw="flex h-[100px] w-[100px]">
          <img
            src={owner.pfp_url}
            alt="Profile"
            tw="flex h-full w-full object-cover rounded-full"
          />
        </div>
        <div tw="flex flex-col ml-3">
          <div tw="flex">{owner.display_name}</div>
          <div tw="flex text-[28px] text-[#9A9898]">@{owner.username}</div>
        </div>
      </div>
      <div tw="flex flex-col text-[26px]">
        <div tw="flex">
          <div>Booked by&nbsp;</div>
          <div tw="flex mx-1 text-[#1F28FF]">&nbsp;@{booker.username}{'  '}</div>
          <div tw="mx-1">&nbsp;for&nbsp;</div>
          <div tw="flex text-[#1F28FF]">{formatPrice(booking.price)} ETH</div>
        </div>
        <div tw="mt-1">
        {timeAgo.format(new Date(Number(booking.bookedTimestamp) * 1000))}
        </div>
      </div>

    </div>
  );
}

export default InfoHeader;
