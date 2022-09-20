import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        autoClose={5000}
        position="bottom-center"
        newestOnTop
        draggable
        hideProgressBar
        pauseOnFocusLoss
        closeOnClick
        pauseOnHover
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
