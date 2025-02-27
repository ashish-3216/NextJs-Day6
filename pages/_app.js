import "@/styles/globals.css";
import SessionWrapper from "./Components/SessionWrapper";

export default function App({ Component, pageProps }) {
  return<>
  <SessionWrapper>
    <Component {...pageProps} />
  </SessionWrapper>
  </> 
}
