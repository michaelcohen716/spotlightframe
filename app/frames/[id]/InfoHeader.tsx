const formatPrice = (num: bigint) => {
  const ether = Number(num) / 1e18;
  return ether.toFixed(5);
};

function InfoHeader({ users, booking }: any) {
  if (!users?.length) return null;
  const [owner, booker] = users;
  return (
    <div
      tw="flex p-4 justify-between"
      style={{
        marginTop: "-60px",
      }}
    >
      <div tw="flex">
        <div tw="flex h-[100px] w-[100px]">
          <img
            src={owner.pfp_url}
            alt="Profile"
            tw="flex h-full w-full object-cover"
          />
        </div>
        <div tw="flex flex-col ml-2">
          <div tw="flex">{owner.display_name}</div>
          <div tw="flex">@{owner.username}</div>
        </div>
      </div>
      <div tw="flex items-center justify-center">
        {formatPrice(booking.price)} ETH
      </div>
      <div tw="flex">
        <div tw="flex h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-full">
          <img
            src={booker.pfp_url}
            alt="Profile"
            tw="h-full w-full object-cover"
          />
        </div>
        <div tw="flex flex-col ml-2">
          <div>{booker.display_name}</div>
          <div tw="flex">@{booker.username}</div>
        </div>
      </div>
    </div>
  );
}

export default InfoHeader;
