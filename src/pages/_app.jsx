import React, { useEffect } from 'react';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from '../store/store';
import { ThemeProvider } from '../contexts/ThemeContext';
import { SessionProvider } from "next-auth/react"
import { useMousePosition } from '../hooks/useMousePosition'

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // Remove the server-side injected CSS when running on client
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;