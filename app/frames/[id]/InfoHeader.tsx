// @ts-nocheck
function InfoHeader({ users, booking }: any) {
  if (!users?.length) return null;
  const [owner, booker] = users;
  return (
    <div
      tw="flex px-4 py-4 justify-between"
      style={{
        marginTop: "-40px",
      }}
    >
      <div tw="flex">
        <div tw="flex h-[80px] w-[80px]">
          <img
            src={owner.pfp_url}
            alt="Profile"
            tw="flex h-full w-full object-cover rounded-full"
          />
        </div>
        <div tw="flex flex-col ml-3 mt-[-8px]">
          <div tw="flex">{owner.display_name}</div>
          <div tw="flex text-[28px] text-[#9A9898]">@{owner.username}</div>
        </div>
      </div>

    </div>
  );
}

export default InfoHeader;
