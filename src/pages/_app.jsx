import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Providers } from '@/providers';
import { ToastContainer } from 'react-toastify';
import { NavBar, Header } from '@/components';
import Box from '@mui/material/Box';

export default function App({ Component, pageProps }) {

  return (
    <>
      <ToastContainer />
      <Providers>
        <div className='flex flex-row h-screen'>
          <NavBar />
          <Box
            component="main"
            sx={{ flexGrow: 1, paddingX: 3, width: { sm: `calc(100% - ${240}px)` }, backgroundColor: '#f8fafc' }}
          >
          <Header />
          <Component {...pageProps} />
          </Box>
        </div>
      </Providers>
    </>
  );
}