import { Roboto } from 'next/font/google';
import { Provider } from 'react-redux';
import store from '@/redux/store';

import dynamic from 'next/dynamic';

import 'react-toastify/dist/ReactToastify.min.css';

import Header from '@/components/header/Header';
import Footer from './footer/Footer';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

type LayoutProps = {
  children: React.ReactNode;
};

const ToastContainer = dynamic(
  () => import('react-toastify').then((module) => module.ToastContainer),
  {
    ssr: false,
  }
);

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={roboto.className}>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Provider store={store}>
        <Header />
        {children}
      </Provider>
      <Footer />
    </div>
  );
};

export default Layout;
