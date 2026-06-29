"use client";

import { useRouter } from "next/navigation";

const Redirect = () => {
  const router = useRouter();
  router.replace("/");
  return <></>;
};

const DevOnly = () => {
  const fetchTwitchToken = async () => {
    const res = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: "POST",
      },
    );
    const result = await res.json();
    console.log(result);
  };

  return (
    <>
      <button onClick={fetchTwitchToken}>fetch token</button>
    </>
  );
};

const OnlyDev = () => {
  if (process.env.NODE_ENV !== "development") {
    return <Redirect />;
  }

  return <DevOnly />;
};

export default OnlyDev;
