import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import '../assets/styles/globals.css'
import {
  SidebarWrap,
  Container,
  ComponentWrap
} from './_app.styled';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(false);

  useEffect(() => {
    setIsSSR(false)
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <Navbar />

      <Container>
        <SidebarWrap>
          <Sidebar />
        </SidebarWrap>
        <ComponentWrap>
          <Component {...pageProps} />
        </ComponentWrap>
      </Container>
    </GoogleOAuthProvider>
  )
}

export default MyApp
