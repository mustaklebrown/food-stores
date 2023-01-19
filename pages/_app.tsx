import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Layout from "../components/Layout";
import "../styles/globals.css"
import { wrapper } from "../store";
import { Toaster } from 'react-hot-toast'

const App = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Layout>
        <Component {...pageProps} />,
      </Layout>
    </SessionProvider>
  );
};

export default wrapper.withRedux(App);
