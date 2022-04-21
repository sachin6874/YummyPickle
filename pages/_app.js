import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

axios.interceptors.request.use(function (config) {
  if (config?.skipAuthRefresh) {
    return config;
  }
  let tokens = localStorage?.getItem("tokens");
  tokens = JSON.parse(window?.atob(tokens));
  config.headers.Authorization = tokens?.access_token;
  config.headers["Content-Type"] = "application/json";
  config.headers["Accept"] = "application/json";
  return config;
});

const refreshAuthLogic = async (e) => {
  try {
    let tokens = localStorage?.getItem("tokens");
    tokens = JSON.parse(window?.atob(tokens));
    await axios
      .post("/api/auth/refresh", {
        token: tokens?.refresh_token,
      })
      .then((t) => {
        localStorage.setItem("tokens", window?.btoa(JSON.stringify(t?.data)));
        e.response.config.headers["Authorization"] = t?.data?.access_token;
      });
    return;
  } catch (e) {
    localStorage.removeItem("tokens");
    Router.replace("/account");
  }
};

createAuthRefreshInterceptor(axios, refreshAuthLogic);

/* css */
import "../styles/_globals.css";
import "remixicon/fonts/remixicon.css";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Head>
        <title>Yummy Pickle</title>
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-navbutton-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </RecoilRoot>
  );
}

export default MyApp;
