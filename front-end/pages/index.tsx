import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

export default function Home() {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <>
      <Head>
        <title>REDEMET API</title>
        <link rel="icon" href="/map-icon.png" />
      </Head>
      <main className="h-screen">
        <Map />
      </main>
    </>
  );
}
