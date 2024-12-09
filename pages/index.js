import Head from "next/head";
import { Bar } from "react-chartjs-2";
import Loading from "@/components/Loading";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nayon's Portfolio Dashboard</title>
        <meta name='description' content="Nayon's Portfolio Dashboard" />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
    </>
  );
}
