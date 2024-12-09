import ParentComponent from "@/components/ParentComponent";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ParentComponent />
      <Component {...pageProps} />
    </>
  );
}
