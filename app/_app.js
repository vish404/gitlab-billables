import { useEffect } from "react";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleResizeObserverError = (e) => {
      if (e.message.includes("ResizeObserver")) {
        e.stopImmediatePropagation(); // Suppress the error
      }
    };

    window.addEventListener("error", handleResizeObserverError);

    return () => {
      window.removeEventListener("error", handleResizeObserverError);
    };
  }, []);

  return <Component {...pageProps} />;
}